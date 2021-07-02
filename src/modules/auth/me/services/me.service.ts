import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/shared/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { UserEntity } from 'src/shared/entities/user.entity';
import { AuthService } from '../../auth.service';

@Injectable()
export class MeService {
  constructor(
    @InjectModel('UserModel') private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async getUserInfos(accessToken: string): Promise<UserEntity | ErrorMessage> {
    try {
      const userDatas = this.authService.extractDataOfToken(accessToken);
      const user = await this.userModel.findOne({
        _id: userDatas['userId'],
      });

      if (!user) {
        return new ErrorMessage('User not found');
      }

      return new UserEntity(user._id, user.username, user.email, user.photoUrl);
    } catch (error) {
      console.log(error);
      return new ErrorMessage('An error happened with server, try again');
    }
  }
}
