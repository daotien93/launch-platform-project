// This file represents the User entity
// The actual schema is defined in prisma/schema.prisma

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
