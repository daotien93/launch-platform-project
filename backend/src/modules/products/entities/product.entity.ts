// This file represents the Product entity
// The actual schema is defined in prisma/schema.prisma

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
