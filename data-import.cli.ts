import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './src/app.module';
import { DataImportService } from './src/data-import/data-import.service';
import { DATA_SOURCE_FILE } from './src/constants/common';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataImportService = app.get(DataImportService);
  const jsonFilePath = join(process.cwd(), DATA_SOURCE_FILE);
  await dataImportService.importData(jsonFilePath);
  await app.close();
}

bootstrap();

// in the terminal run: npx ts-node data-import.cli.ts or npm run import-data
