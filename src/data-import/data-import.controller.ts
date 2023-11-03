import { join } from 'path';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataImportService } from './data-import.service';
import { DATA_SOURCE_FILE } from '../constants/common';

const jsonFilePath = join(process.cwd(), DATA_SOURCE_FILE);

@Controller('data-import')
@ApiTags('data-import')
export class DataImportController {
  constructor(private dataImportService: DataImportService) {}

  @Post()
  async initiateImport() {
    return this.dataImportService.importData(jsonFilePath);
  }
}
