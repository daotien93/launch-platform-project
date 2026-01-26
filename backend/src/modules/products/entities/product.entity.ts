// This file represents the Product entity
// The actual schema is defined in prisma/schema.prisma

export interface Product {
  id: string;
  name: string;
  description?: string;
  image?: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount: number;
  category?: string;
  restaurantName?: string;
  restaurantAddress?: string;
  cuisineType?: string;
  tags?: string[];
  calories?: number;
  ingredients?: string;
  allergens?: string;
  portionSize?: string;
  priceRange?: string;
  preparationTime?: number;
  spiceLevel?: number;
  isAvailable: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
