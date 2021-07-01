/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { SignInUserDTO } from '../dtos/user.dto';
import { LoginUsecase } from '../usecases/login.usecase';

@Controller('auth/signin')
export class LoginController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  @Post('login')
  async createUser(@Body() body: SignInUserDTO, @Res() res: Response) {
    const result = await this.loginUsecase.execute(body);

    if (result instanceof ErrorMessage) {
      return res
        .status(400)
        .json({ message: (result as ErrorMessage).message });
    }
    return res.json(result);
  }
}
