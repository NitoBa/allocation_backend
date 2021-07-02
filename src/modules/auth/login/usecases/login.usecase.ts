import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/shared/entities/user.entity';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { SignInUserDTO } from '../dtos/user.dto';
import { LoginService } from '../services/login.service';

@Injectable()
export class LoginUsecase {
  constructor(private readonly loginService: LoginService) {}

  async execute(
    userDTO: SignInUserDTO,
  ): Promise<Record<string, any> | ErrorMessage> {
    if (!userDTO.email || !userDTO.password) {
      return new ErrorMessage('email and password are required fields');
    }
    return await this.loginService.singIn(userDTO);
  }
}
