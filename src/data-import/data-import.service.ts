import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileReaderProvider } from './file-reader.provider';
import { ProductDto } from './dto/product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class DataImportService {
  constructor(
    private prisma: PrismaService,
    private fileReaderProvider: FileReaderProvider,
  ) {}

  async importData(filePath: string): Promise<{
    message: string;
    success: boolean;
    status: HttpStatus;
    data: Product;
  }> {
    try {
      // Read the JSON data from the file using the FileReaderProvider
      const productData = await this.fileReaderProvider.readJSONFile(filePath);

      if (productData) {
        return this.finallyImportToDB(productData);
      } else {
        throw new BadRequestException('Invalid JSON data format');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error importing data: ${error.toString()}`,
      );
    }
  }

  async finallyImportToDB(productData: ProductDto) {
    try {
      const product = {
        name: productData.name,
        image: productData.product_group_image,
        ProductPrice: {
          create: [],
        },
        ProductToCategory: {
          create: productData.categories.map((category) => ({
            Category: {
              create: {
                name: category.name,
              },
            },
          })),
        },
      };

      for (const productVariant of productData.product_variants) {
        for (const quantity of productVariant.quantities) {
          product.ProductPrice.create.push({
            price: quantity?.Standard_price ?? 0,
            product_quantity: quantity?.quantity ?? 0,
          });
        }
      }

      const createdProduct = await this.prisma.product.create({
        data: product,
      });

      return {
        message: 'Product created successfully',
        success: true,
        status: HttpStatus.CREATED,
        data: createdProduct,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating product: ${error.toString()}`,
      );
    }
  }
}
