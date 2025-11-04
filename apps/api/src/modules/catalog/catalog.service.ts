import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

type ProductWithRelations = {
  reviews: { rating: number }[];
  variants: Array<{
    inventory: { stock?: number } | null;
    [key: string]: unknown;
  }>;
  prices: Array<{ amount?: unknown }>;
  [key: string]: unknown;
};

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  findProducts(params: { skip?: number; take?: number; search?: string; categorySlug?: string }) {
    const where: Record<string, unknown> = params.search
      ? {
          OR: [
            { title: { contains: params.search, mode: 'insensitive' } },
            { description: { contains: params.search, mode: 'insensitive' } }
          ]
        }
      : {};

    if (params.categorySlug) {
      Object.assign(where, {
        categories: { some: { category: { slug: params.categorySlug } } }
      });
    }

    return this.prisma.product
      .findMany({
        where,
        include: {
          prices: true,
          reviews: true,
          variants: {
            include: {
              inventory: true
            }
          }
        },
        skip: params.skip,
        take: params.take,
        orderBy: { createdAt: 'desc' }
      })
      .then((products: ProductWithRelations[]) =>
        products.map((product) => ({
          ...product,
          rating:
            product.reviews.length > 0
              ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
              : null,
          variants: product.variants.map((variant) => ({
            ...variant,
            stock: variant.inventory?.stock ?? 0,
            price: product.prices[0]?.amount ? Number(product.prices[0]?.amount) : null
          }))
        }))
      );
  }

  findProductBySlug(slug: string) {
    return this.prisma.product
      .findUnique({
        where: { slug },
        include: {
          prices: true,
          variants: {
            include: {
              inventory: true
            }
          },
          reviews: true
        }
      })
      .then((product: ProductWithRelations | null) =>
        product
          ? {
              ...product,
              rating:
                product.reviews.length > 0
                  ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
                  : null,
              variants: product.variants.map((variant) => ({
                ...variant,
                stock: variant.inventory?.stock ?? 0,
                price: product.prices[0]?.amount ? Number(product.prices[0]?.amount) : null
              }))
            }
          : null
      );
  }

  findCategories() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }
}
