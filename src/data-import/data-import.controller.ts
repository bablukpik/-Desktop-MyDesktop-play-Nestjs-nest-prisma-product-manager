import { join } from 'path';
import { Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DataImportService } from './data-import.service';
import { DATA_SOURCE_FILE } from '../constants/common';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { PriceEntity } from './entities/price.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';

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

  @Get('products')
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findAllProducts() {
    return this.dataImportService.findAllProducts();
  }

  @Get('categories')
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  findAllCategories() {
    return this.dataImportService.findAllCategories();
  }

  @Get('prices')
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    required: false,
    description: 'Items per page',
  })
  @ApiOkResponse({ type: PriceEntity, isArray: true })
  findAllPrices(@Query() query: PaginationQueryDto) {
    return this.dataImportService.findAllPrices(query);
  }
}
