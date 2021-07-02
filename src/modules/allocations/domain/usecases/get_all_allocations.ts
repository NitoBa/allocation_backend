import { Injectable } from '@nestjs/common';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { AllocationsService } from '../../infra/services/allocations.service';
import { AllocationItemDTO } from '../dto/allocation.item.dto';

@Injectable()
export class GetAllAllocationsUsecase {
  constructor(private readonly allocationService: AllocationsService) {}

  async execute(
    page: number,
    limit = 10,
  ): Promise<AllocationItemDTO[] | ErrorMessage> {
    if (!page || page <= 0) {
      return new ErrorMessage(
        'Query parameter page is required and not can be less 0',
      );
    }
    return await this.allocationService.getAllAllocations(page, limit);
  }
}
