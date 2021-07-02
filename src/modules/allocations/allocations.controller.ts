import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { GetAllAllocationsUsecase } from './domain/usecases/get_all_allocations';

@Controller('allocations')
export class AllocationsController {
  constructor(private readonly getAllocations: GetAllAllocationsUsecase) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllAllocations(@Query('page') page: string, @Res() res: Response) {
    const result = await this.getAllocations.execute(Number(page));
    if (result instanceof ErrorMessage) {
      return res
        .status(400)
        .json({ message: (result as ErrorMessage).message });
    }
    return res.json(result);
  }
}
