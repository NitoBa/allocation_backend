/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { CreateUserDTO } from '../createAccount/dtos/createUser.dto';
import { CreateUserUsecase } from '../createAccount/usecases/createUser.usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @Post('create')
  async createUser(@Body() body: CreateUserDTO, @Res() res: Response) {
    const result = await this.createUserUsecase.execute(body);
    if (result instanceof ErrorMessage) {
      return res
        .status(400)
        .json({ message: (result as ErrorMessage).message });
    }
    return res.json(result);
  }
}
