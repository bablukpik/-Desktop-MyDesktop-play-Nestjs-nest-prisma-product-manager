import { join } from 'path';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataImportService } from './data-import.service';
import { DATA_SOURCE_FILE } from '../constants/common';

@Controller('data-import')
@ApiTags('data-import')
export class DataImportController {
  constructor(private dataImportService: DataImportService) {}

  @Get()
  async initiateImport() {
    const jsonFilePath = join(process.cwd(), DATA_SOURCE_FILE);
    const data = await this.dataImportService.importData(jsonFilePath);
    // return { message: 'Data import initiated' };
    return data;
  }
}
