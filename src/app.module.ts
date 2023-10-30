import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DataImportModule } from './data-import/data-import.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, DataImportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
