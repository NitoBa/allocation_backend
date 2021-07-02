import { Injectable } from '@nestjs/common';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenUsecase {
  constructor(private readonly authService: AuthService) {}

  async execute(refreshToken: string): Promise<string | ErrorMessage> {
    if (!refreshToken) {
      return new ErrorMessage('Refresh token is required field');
    }

    const isValidRefreshToken = await this.authService.validateRefreshToken(
      refreshToken,
    );

    if (!isValidRefreshToken) {
      console.log(isValidRefreshToken);
      return new ErrorMessage('Invalid refresh Token, go to login again');
    }

    const accessToken = this.authService.generateToken(refreshToken);

    return accessToken;
  }
}
