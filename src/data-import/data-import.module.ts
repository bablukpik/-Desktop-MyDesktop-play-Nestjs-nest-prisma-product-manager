import { Module } from '@nestjs/common';
import { DataImportController } from './data-import.controller';
import { DataImportService } from './data-import.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileReaderProvider } from './file-reader.provider';

@Module({
  controllers: [DataImportController],
  providers: [DataImportService, FileReaderProvider],
  imports: [PrismaModule],
})
export class DataImportModule {}
