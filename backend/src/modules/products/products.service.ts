import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, userId: string) {
    // Serialize arrays to JSON strings for Prisma
    const data = {
      ...createProductDto,
      images: createProductDto.images
        ? JSON.stringify(createProductDto.images)
        : null,
      tags: createProductDto.tags ? JSON.stringify(createProductDto.tags) : null,
      userId,
    };

    const product = await this.prisma.product.create({ data });

    // Deserialize JSON strings back to arrays
    return {
      ...product,
      images: product.images ? JSON.parse(product.images) : null,
      tags: product.tags ? JSON.parse(product.tags) : null,
    };
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Deserialize JSON strings back to arrays
    return products.map((product) => ({
      ...product,
      images: product.images ? JSON.parse(product.images) : null,
      tags: product.tags ? JSON.parse(product.tags) : null,
    }));
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Deserialize JSON strings back to arrays
    return {
      ...product,
      images: product.images ? JSON.parse(product.images) : null,
      tags: product.tags ? JSON.parse(product.tags) : null,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto, userId: string) {
    const product = await this.findOne(id);

    if (product.userId !== userId) {
      throw new ForbiddenException('You can only update your own products');
    }

    // Serialize arrays to JSON strings for Prisma
    const data: any = { ...updateProductDto };
    if (updateProductDto.images !== undefined) {
      data.images = updateProductDto.images
        ? JSON.stringify(updateProductDto.images)
        : null;
    }
    if (updateProductDto.tags !== undefined) {
      data.tags = updateProductDto.tags
        ? JSON.stringify(updateProductDto.tags)
        : null;
    }

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data,
    });

    // Deserialize JSON strings back to arrays
    return {
      ...updatedProduct,
      images: updatedProduct.images
        ? JSON.parse(updatedProduct.images)
        : null,
      tags: updatedProduct.tags ? JSON.parse(updatedProduct.tags) : null,
    };
  }

  async remove(id: string, userId: string) {
    const product = await this.findOne(id);

    if (product.userId !== userId) {
      throw new ForbiddenException('You can only delete your own products');
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
