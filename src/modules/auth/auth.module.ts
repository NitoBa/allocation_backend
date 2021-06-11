import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { UserSchema } from './createAccount/models/user.model';
import { CreateAccountService } from './createAccount/services/createAccount.service';
import { CreateUserUsecase } from './createAccount/usecases/createUser.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserModel', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [CreateUserUsecase, CreateAccountService],
})
export class AuthModule {}
