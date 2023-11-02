export class ProductDto {
  '@context': string;
  '@id': string;
  '@type': string;
  product_group_id: number;
  name: string;
  description: string;
  description_html: string;
  product_group_image: string;
  product_variants: ProductVariantDto[];
  categories: CategoryDto[];
}

export class ProductVariantDto {
  '@context': string;
  '@id': string;
  '@type': string;
  product_variant_id: number;
  product_data_sheet: string;
  product_data_sheet_wl: string | null;
  quantities: ProductQuantityDto[];
  attributes: ProductAttributeDto[];
}

export class ProductQuantityDto {
  '@context': string;
  '@id': string;
  '@type': string;
  quantity_id: string;
  quantity: number;
  currency: string;
  Standard_available: boolean;
  Standard_from: number;
  Standard_to: number;
  Standard_deadline: string;
  Standard_price: number;
  Express_available: boolean;
  Express_from: number;
  Express_to: number;
  Express_price: number;
  Overnight_available: boolean;
  Overnight_from: number;
  Overnight_to: number;
  Overnight_price: number;
  Sameday_available: boolean;
  Sameday_from: number;
  Sameday_to: number;
  Sameday_price: number;
  Weight: number;
}

export class ProductAttributeDto {
  '@id': string;
  '@type': string;
  attribute_name_id: string;
  attribute_name: string;
  attribute_value_id: string;
  attribute_value: string;
}

export class CategoryDto {
  id: number;
  name: string;
}
