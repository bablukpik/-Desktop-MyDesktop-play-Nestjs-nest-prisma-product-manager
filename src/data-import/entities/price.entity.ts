import { ProductPrice } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PriceEntity implements ProductPrice {
  @ApiProperty()
  price_id: number;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  product_quantity: number;

  @ApiProperty({ required: false, nullable: true })
  price: number;
}
