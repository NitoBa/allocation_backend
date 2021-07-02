import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDTO } from './login/dtos/jwt.payload.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(refreshToken: string): string {
    const accessToken = this.jwtService.sign(
      { refreshToken },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '60s',
      },
    );
    return accessToken;
  }

  generateRefreshToken(payload: JwtPayloadDTO) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '2m',
    });
    return refreshToken;
  }

  async validateRefreshToken(refreshToken: string): Promise<boolean> {
    try {
      await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  extractDataOfToken(token: string): { [key: string]: any } {
    const accessToken = this.jwtService.decode(token);
    return this.jwtService.decode(accessToken['refreshToken']) as {
      [key: string]: any;
    };
  }
}
