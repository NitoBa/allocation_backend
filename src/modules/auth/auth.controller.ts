import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { CreateUserDTO } from './createAccount/dtos/createUser.dto';
import { CreateUserUsecase } from './createAccount/usecases/createUser.usecase';
import { Response } from 'express';
import { LoginUsecase } from './login/usecases/login.usecase';
import { SignInUserDTO } from './login/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly loginUsecase: LoginUsecase,
  ) {}

  @Post('singup')
  async createUser(@Body() body: CreateUserDTO, @Res() res: Response) {
    const result = await this.createUserUsecase.execute(body);
    if (result instanceof ErrorMessage) {
      return res
        .status(400)
        .json({ message: (result as ErrorMessage).message });
    }
    return res.json({ message: result });
  }

  @HttpCode(200)
  @Post('singin')
  async SignIn(@Body() body: SignInUserDTO, @Res() res: Response) {
    const result = await this.loginUsecase.execute(body);

    if (result instanceof ErrorMessage) {
      return res
        .status(400)
        .json({ message: (result as ErrorMessage).message });
    }
    return res.json(result);
  }
}
