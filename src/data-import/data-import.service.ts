import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import productsJson from '../../products.json';

interface ProductData {
  products: {
    // Define the structure of the products property here
  }[];
}

@Injectable()
export class DataImportService {
  constructor(private prisma: PrismaService) {}

  async importData() {
    const productData: ProductData = productsJson as ProductData;
    for (const product of productData.products) {
      return product;
      // logic to be implemented
    }
  }
}
