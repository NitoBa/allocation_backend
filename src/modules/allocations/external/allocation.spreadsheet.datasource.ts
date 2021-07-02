import { Injectable } from '@nestjs/common';
import { allocationLog } from 'src/shared/constants/app.constants';
import { api } from 'src/shared/services/api';
import { AllocationItemDTO } from '../domain/dto/allocation.item.dto';

@Injectable()
export class AllocationSpreadsheetDatasource {
  async getAllocationsBydatasource(
    page: number,
    limit: number,
  ): Promise<AllocationItemDTO[]> {
    const response = await api.get(
      `exec?type=${allocationLog}&page=${page}&limit=${limit}`,
    );
    return response.data;
  }
}
