import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/shared/models/user.model';
import { SignUpController } from './createAccount/controllers/signup.controller';
import { CreateAccountService } from './createAccount/services/createAccount.service';
import { CreateUserUsecase } from './createAccount/usecases/createUser.usecase';
import { LoginController } from './login/controllers/login.controller';
import { LoginService } from './login/services/login.service';
import { LoginUsecase } from './login/usecases/login.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserModel', schema: UserSchema }]),
  ],
  controllers: [SignUpController, LoginController],
  providers: [
    CreateUserUsecase,
    LoginUsecase,
    LoginService,
    CreateAccountService,
  ],
})
export class AuthModule {}
