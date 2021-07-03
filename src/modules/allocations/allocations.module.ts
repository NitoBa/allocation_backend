import { Module } from '@nestjs/common';
import { AllocationsController } from './allocations.controller';
import { AllocationsService } from './infra/services/allocations.service';
import { AllocationSpreadsheetDatasource } from './external/allocation.spreadsheet.datasource';
import { GetAllAllocationsUsecase } from './domain/usecases/get.all.allocations';
import { GetAllocationProjectsUsecase } from './domain/usecases/get.allocation.projects';

@Module({
  controllers: [AllocationsController],
  providers: [
    GetAllAllocationsUsecase,
    GetAllocationProjectsUsecase,
    AllocationsService,
    AllocationSpreadsheetDatasource,
  ],
})
export class AllocationModule {}
