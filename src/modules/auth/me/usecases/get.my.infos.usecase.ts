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
    const accessToken = token.split(' ')[1];
    return await this.meService.getUserInfos(accessToken);
  }
}
