import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileReaderProvider } from './file-reader.provider';
// import { join } from 'path';
import { ProductDto } from './dto/product.dto';

// const PRODUCTS_JSON = 'products.json';

@Injectable()
export class DataImportService {
  constructor(
    private prisma: PrismaService,
    private fileReaderProvider: FileReaderProvider,
  ) {}

  async importData(filePath: string): Promise<void> {
    try {
      // Read the JSON data from the file using the FileReaderProvider
      const jsonData = this.fileReaderProvider.readJSONFile(filePath);

      // Assuming jsonData is an array of ProductDto objects
      if (Array.isArray(jsonData)) {
        for (const productDto of jsonData) {
          // Map and import the products into the database
          await this.finallyImportToDB(productDto);
        }
      } else {
        console.error('Invalid JSON data format.');
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }

  async finallyImportToDB(productDto: ProductDto) {
    // const jsonFilePath = join(process.cwd(), PRODUCTS_JSON);
    // const jsonData = await this.fileReaderProvider.readJSONFile(jsonFilePath);
    // for (const productData of products) {
    //   // Transform productData as needed
    //   const product = {
    //     name: productData.name,
    //     image: productData.product_group_image,
    //     // Add more fields and transformations as needed
    //   };
    //   const categories = productData.categories.map((category) => {
    //     return {
    //       name: category.name,
    //     };
    //   });
    //   const createdProduct = await this.prisma.product.create({
    //     data: {
    //       ...product,
    //       categories: {
    //         create: categories,
    //       },
    //     },
    //   });
    //   // Process product variants, quantities, and prices as needed and link to the createdProduct
    //   // Note: This depends on your data structure.
    //   // Log or handle any errors if necessary
    // }

    try {
      const products = productDto.product_variants.map((productVariant) => ({
        name:
          productVariant.attributes.find(
            (attr) => attr.attribute_name === 'Size',
          )?.attribute_value || 'Unknown', // Customize this to match your data
        image: productDto.product_group_image,
        price: productVariant.quantities[0].Standard_price, // Use the price that makes sense
      }));

      for (const product of products) {
        await this.prisma.product.create({
          data: product,
        });
      }
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }
}
