import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/shared/models/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAccountService } from './createAccount/services/createAccount.service';
import { CreateUserUsecase } from './createAccount/usecases/createUser.usecase';
import { LoginService } from './login/services/login.service';
import { LoginUsecase } from './login/usecases/login.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserModel', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    CreateUserUsecase,
    LoginUsecase,
    LoginService,
    CreateAccountService,
  ],
})
export class AuthModule {}
