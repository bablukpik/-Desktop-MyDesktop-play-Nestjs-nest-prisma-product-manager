import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './src/app.module';
import { DataImportService } from './src/data-import/data-import.service';
import { DATA_SOURCE_FILE } from './src/constants/common';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataImportService = app.get(DataImportService);
  const jsonFilePath = join(process.cwd(), DATA_SOURCE_FILE);
  const data = await dataImportService.importData(jsonFilePath);

  console.log('data', data);

  await app.close();
}

bootstrap();

// in the terminal run: npx ts-node data-import.cli.ts
