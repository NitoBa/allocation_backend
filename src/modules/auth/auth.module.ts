import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/shared/models/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAccountService } from './createAccount/services/createAccount.service';
import { CreateUserUsecase } from './createAccount/usecases/createUser.usecase';
import { LoginService } from './login/services/login.service';
import { LoginUsecase } from './login/usecases/login.usecase';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { MeService } from './me/services/me.service';
import { GetMyInfosUsecase } from './me/usecases/get.my.infos.usecase';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'UserModel', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    CreateUserUsecase,
    LoginUsecase,
    GetMyInfosUsecase,
    LoginService,
    CreateAccountService,
    MeService,
    JwtStrategy,
  ],
})
export class AuthModule {}
