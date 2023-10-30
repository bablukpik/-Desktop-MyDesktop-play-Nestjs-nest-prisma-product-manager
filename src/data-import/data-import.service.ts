import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileReaderProvider } from './file-reader.provider';

@Injectable()
export class DataImportService {
  constructor(
    private prisma: PrismaService,
    private fileReaderProvider: FileReaderProvider,
  ) {}

  async importData() {
    // Use the FileReaderProvider to read the JSON file
    const jsonData = await this.fileReaderProvider.readJSONFile('your-json-file.json');

    for (const product of jsonData.products) {
      // Implement your logic to transform and insert data into the database using Prisma
      // You can use Prisma to create records in the Product, ProductPrice, Category, and ProductToCategory tables.
      await this.createProduct(product);
    }
  }

  async createProduct(product: any) {
    // Implement your logic to create a product using Prisma
    // Example: await this.prisma.product.create({ data: product });
  }
}
