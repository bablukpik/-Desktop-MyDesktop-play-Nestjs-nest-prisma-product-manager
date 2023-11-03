import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './src/app.module';
import { DataImportService } from './src/data-import/data-import.service';
import { DATA_SOURCE_FILE } from './src/constants/common';

const jsonFilePath = join(process.cwd(), DATA_SOURCE_FILE);

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataImportService = app.get(DataImportService);
  const response = await dataImportService.importData(jsonFilePath);
  console.log('response', response);
  await app.close();
}

bootstrap();

// in the terminal run: npx ts-node data-import.cli.ts or npm run import-data
