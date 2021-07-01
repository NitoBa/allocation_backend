import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MeService } from '../services/me.service';

@Injectable()
export class GetMyInfosUsecase {
  constructor(
    private readonly meService: MeService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(token: string) {
    const [_, accessToken] = token.split(' ');
    const decryptedToken = await this.jwtService.verify(accessToken);
    return await this.meService.getUserInfos(decryptedToken.userId);
  }
}
