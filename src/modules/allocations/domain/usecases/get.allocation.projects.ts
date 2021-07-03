import { Injectable } from '@nestjs/common';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { AllocationsService } from '../../infra/services/allocations.service';
import { AllocationProjectItemDTO } from '../dto/allocation.project.item.dto';

@Injectable()
export class GetAllocationProjectsUsecase {
  constructor(private readonly allocationService: AllocationsService) {}

  async execute(): Promise<AllocationProjectItemDTO[] | ErrorMessage> {
    return await this.allocationService.getAllocationProjects();
  }
}
