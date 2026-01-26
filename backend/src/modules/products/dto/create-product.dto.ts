import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsUrl,
  IsBoolean,
  IsArray,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  image?: string;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  images?: string[];

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  originalPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  reviewCount?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  restaurantName?: string;

  @IsString()
  @IsOptional()
  restaurantAddress?: string;

  @IsString()
  @IsOptional()
  cuisineType?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @IsInt()
  @IsOptional()
  @Min(0)
  calories?: number;

  @IsString()
  @IsOptional()
  ingredients?: string;

  @IsString()
  @IsOptional()
  allergens?: string;

  @IsString()
  @IsOptional()
  portionSize?: string;

  @IsString()
  @IsOptional()
  priceRange?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  preparationTime?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  spiceLevel?: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
