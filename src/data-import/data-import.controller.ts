import { join } from 'path';
import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DataImportService } from './data-import.service';
import { DATA_SOURCE_FILE } from '../constants/common';
import { ProductEntity } from './entities/product.entity';

const jsonFilePath = join(process.cwd(), DATA_SOURCE_FILE);

@Controller('data-import')
@ApiTags('data-import')
export class DataImportController {
  constructor(private dataImportService: DataImportService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity })
  async initiateImport() {
    return this.dataImportService.importData(jsonFilePath);
  }
}
