/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { CreateUserUsecase } from '../usecases/createUser.usecase';

@Controller('auth/signup')
export class SignUpController {
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
