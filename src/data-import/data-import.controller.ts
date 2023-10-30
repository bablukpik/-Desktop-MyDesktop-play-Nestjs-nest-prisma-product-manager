import { Controller, Get } from '@nestjs/common';
import { DataImportService } from './data-import.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('data-import')
@ApiTags('data-import')
export class DataImportController {
  constructor(private dataImportService: DataImportService) {}

  @Get()
  async initiateImport() {
    const data = await this.dataImportService.importData();
    // return { message: 'Data import initiated' };
    return data;
  }
}
