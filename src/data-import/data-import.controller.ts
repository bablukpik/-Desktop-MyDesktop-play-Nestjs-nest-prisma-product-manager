import { Controller, Post } from '@nestjs/common';
import { DataImportService } from './data-import.service';

@Controller('data-import')
export class DataImportController {
  constructor(private dataImportService: DataImportService) {}

  @Post()
  async initiateImport() {
    await this.dataImportService.importData();
    return { message: 'Data import initiated' };
  }
}
