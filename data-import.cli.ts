import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataImportService } from './data-import.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataImportService = app.get(DataImportService);

  await dataImportService.importData();

  await app.close();
}

bootstrap();
