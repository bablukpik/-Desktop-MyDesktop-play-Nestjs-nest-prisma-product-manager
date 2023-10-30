import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DataImportService } from './data-import/data-import.service';
import { DataImportController } from './data-import/data-import.controller';
import { DataImportModule } from './data-import/data-import.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, DataImportModule],
  controllers: [AppController, DataImportController],
  providers: [AppService, DataImportService],
})
export class AppModule {}
