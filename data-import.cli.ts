import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DataImportService } from 'src/data-import/data-import.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataImportService = app.get(DataImportService);

  await dataImportService.importData();

  await app.close();
}

bootstrap();
