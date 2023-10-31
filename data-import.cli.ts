import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DataImportService } from './src/data-import/data-import.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataImportService = app.get(DataImportService);

  const data = await dataImportService.importData();

  console.log('data', data);

  await app.close();
}

bootstrap();

// in the terminal run: npx ts-node data-import.cli.ts
