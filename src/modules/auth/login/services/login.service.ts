import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { UserDocument } from 'src/shared/models/user.model';
import { SignInUserDTO } from '../dtos/user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('UserModel') private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async singIn(userDTO: SignInUserDTO): Promise<string | ErrorMessage> {
    try {
      const user = await this.userModel.findOne({
        email: userDTO.email,
      });

      if (!user) {
        return new ErrorMessage('User not registered');
      }

      const isMatchedPassword = await compare(userDTO.password, user.password);

      if (isMatchedPassword) {
        const payload = {
          username: user.username,
          userId: user._id,
          email: user.email,
        };
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
      } else {
        return new ErrorMessage('Invalid password');
      }
    } catch (error) {
      console.log(error);
      return new ErrorMessage('An error happened with server, try again');
    }
  }
}
