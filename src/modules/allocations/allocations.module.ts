import { Module } from '@nestjs/common';
import { AllocationsController } from './allocations.controller';
import { AllocationsService } from './infra/services/allocations.service';
import { AllocationSpreadsheetDatasource } from './external/allocation.spreadsheet.datasource';
import { GetAllAllocationsUsecase } from './domain/usecases/get_all_allocations';

@Module({
  controllers: [AllocationsController],
  providers: [
    GetAllAllocationsUsecase,
    AllocationsService,
    AllocationSpreadsheetDatasource,
  ],
})
export class AllocationModule {}
