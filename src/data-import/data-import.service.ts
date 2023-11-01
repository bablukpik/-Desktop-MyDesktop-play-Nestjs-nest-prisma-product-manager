import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileReaderProvider } from './file-reader.provider';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class DataImportService {
  constructor(
    private prisma: PrismaService,
    private fileReaderProvider: FileReaderProvider,
  ) {}

  async importData(filePath: string): Promise<void> {
    try {
      // Read the JSON data from the file using the FileReaderProvider
      const productData = await this.fileReaderProvider.readJSONFile(filePath);

      if (productData) {
        await this.finallyImportToDB(productData);
      } else {
        console.error('Invalid JSON data format.');
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }

  async finallyImportToDB(productData: ProductDto) {
    try {
      const product = {
        name: productData.name,
        image: productData.product_group_image,
      };

      const productPrices = [];

      for (const productVariant of productData.product_variants) {
        for (const quantity of productVariant.quantities) {
          productPrices.push({
            price: quantity?.Standard_price ?? 0,
            product_quantity: quantity?.quantity ?? 0,
          });
        }
      }

      // const categories = productData.categories.map((category) => {
      //   return {
      //     name: category.name,
      //   };
      // });

      const createdProduct = await this.prisma.product.create({
        data: {
          ...product,
          ProductPrice: {
            create: productPrices,
          },
          // categories: {
          //         create: categories,
          //       },
        },
      });

      console.log('Product created:', createdProduct);
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }
}
