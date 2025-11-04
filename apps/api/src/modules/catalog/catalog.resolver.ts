import { Args, Query, Resolver } from '@nestjs/graphql';
import type { Category, Product } from '@prisma/client';

import { CatalogService } from './catalog.service';
import { ProductModel } from './models/product.model';
import { CategoryModel } from './models/category.model';

@Resolver(() => ProductModel)
export class CatalogResolver {
  constructor(private catalogService: CatalogService) {}

  @Query(() => [ProductModel], { name: 'products' })
  products(
    @Args('search', { nullable: true }) search?: string,
    @Args('categorySlug', { nullable: true }) categorySlug?: string,
    @Args('take', { type: () => Number, nullable: true }) take = 12,
    @Args('skip', { type: () => Number, nullable: true }) skip = 0
  ): Promise<Product[]> {
    return this.catalogService.findProducts({ search, categorySlug, take, skip });
  }

  @Query(() => ProductModel, { name: 'product' })
  product(@Args('slug') slug: string) {
    return this.catalogService.findProductBySlug(slug);
  }

  @Query(() => [CategoryModel], { name: 'categories' })
  categories(): Promise<Category[]> {
    return this.catalogService.findCategories();
  }
}
