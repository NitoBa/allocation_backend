import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { CreateUserDTO } from './createAccount/dtos/createUser.dto';
import { CreateUserUsecase } from './createAccount/usecases/createUser.usecase';
import { Response, Request } from 'express';
import { LoginUsecase } from './login/usecases/login.usecase';
import { SignInUserDTO } from './login/dtos/user.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { GetMyInfosUsecase } from './me/usecases/get.my.infos.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly loginUsecase: LoginUsecase,
    private readonly getMyInfosUsecase: GetMyInfosUsecase,
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
    return res.json({ accessToken: result });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfos(@Res() res: Response, @Req() req: Request) {
    const result = await this.getMyInfosUsecase.execute(
      req.headers.authorization,
    );
    if (result instanceof ErrorMessage) {
      return res
        .status(400)
        .json({ message: (result as ErrorMessage).message });
    }
    return res.json(result);
  }
}
