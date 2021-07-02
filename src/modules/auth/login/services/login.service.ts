import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { UserDocument } from 'src/shared/models/user.model';
import { SignInUserDTO } from '../dtos/user.dto';
import { compare } from 'bcrypt';
import { AuthService } from '../../auth.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel('UserModel') private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async singIn(
    userDTO: SignInUserDTO,
  ): Promise<Record<string, any> | ErrorMessage> {
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
        const refreshToken = this.authService.generateRefreshToken(payload);
        const accessToken = this.authService.generateToken(refreshToken);
        return { accessToken, refreshToken };
      } else {
        return new ErrorMessage('Invalid password');
      }
    } catch (error) {
      console.log(error);
      return new ErrorMessage('An error happened with server, try again');
    }
  }
}
