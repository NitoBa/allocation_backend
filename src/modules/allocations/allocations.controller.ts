import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { GetAllAllocationsUsecase } from './domain/usecases/get.all.allocations';
import { GetAllocationProjectsUsecase } from './domain/usecases/get.allocation.projects';

@Controller('allocations')
export class AllocationsController {
  constructor(
    private readonly getAllocations: GetAllAllocationsUsecase,
    private readonly getAllocationProjectsUsecase: GetAllocationProjectsUsecase,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('logs')
  async getAllAllocations(@Query('page') page: string, @Res() res: Response) {
    const result = await this.getAllocations.execute(Number(page));
    if (result instanceof ErrorMessage) {
      return res
        .status(400)
        .json({ message: (result as ErrorMessage).message });
    }
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('projects')
  async getAllocationProjects(@Res() res: Response) {
    const result = await this.getAllocationProjectsUsecase.execute();
    if (result instanceof ErrorMessage) {
      return res
        .status(400)
        .json({ message: (result as ErrorMessage).message });
    }
    return res.json(result);
  }
}
