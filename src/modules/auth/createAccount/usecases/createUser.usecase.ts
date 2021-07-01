import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { validateEmail } from 'src/shared/constants/app.constants';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { User } from 'src/shared/models/user.model';
import { CreateUserDTO } from '../dtos/createUser.dto';
import { CreateAccountService } from '../services/createAccount.service';

@Injectable()
export class CreateUserUsecase {
  constructor(private readonly createAccountService: CreateAccountService) {}

  async execute(createUserDTO: CreateUserDTO): Promise<User | ErrorMessage> {
    if (
      !createUserDTO.email ||
      !createUserDTO.password ||
      !createUserDTO.username
    ) {
      return new ErrorMessage(
        'Username, email and password are required fields',
      );
    } else if (!validateEmail(createUserDTO.email)) {
      return new ErrorMessage('Enter with valid email');
    } else {
      const newPassword = await hash(
        createUserDTO.password,
        Number(process.env.HASH_PASSWORD_SALT),
      );
      createUserDTO.password = newPassword;
      const result = await this.createAccountService.createUser(createUserDTO);
      return result;
    }
  }
}
