import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CatalogService } from './catalog.service';

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Get('products')
  @ApiOkResponse({ description: 'Listado de productos paginado' })
  listProducts(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 12,
    @Query('search') search?: string,
    @Query('category') categorySlug?: string
  ) {
    const take = Number(pageSize);
    const skip = (Number(page) - 1) * take;
    return this.catalogService.findProducts({ skip, take, search, categorySlug });
  }

  @Get('products/:slug')
  @ApiOkResponse({ description: 'Detalle de producto por slug' })
  product(@Param('slug') slug: string) {
    return this.catalogService.findProductBySlug(slug);
  }

  @Get('categories')
  @ApiOkResponse({ description: 'Listado de categorías' })
  categories() {
    return this.catalogService.findCategories();
  }
}
