import { Injectable } from '@nestjs/common';
import { ErrorMessage } from 'src/shared/errors/errorMessage';
import { AllocationItemDTO } from '../../domain/dto/allocation.item.dto';
import { AllocationSpreadsheetDatasource } from '../../external/allocation.spreadsheet.datasource';

@Injectable()
export class AllocationsService {
  constructor(private readonly datasource: AllocationSpreadsheetDatasource) {}
  async getAllAllocations(
    page: number,
    limit: number,
  ): Promise<AllocationItemDTO[] | ErrorMessage> {
    try {
      const result = await this.datasource.getAllocationsBydatasource(
        page,
        limit,
      );
      return result;
    } catch (error) {
      return new ErrorMessage('Error on internal API');
    }
  }
}
