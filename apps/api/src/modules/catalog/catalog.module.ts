import { Module } from '@nestjs/common';

import { CatalogController } from './catalog.controller';
import { CatalogResolver } from './catalog.resolver';
import { CatalogService } from './catalog.service';

@Module({
  providers: [CatalogService, CatalogResolver],
  controllers: [CatalogController]
})
export class CatalogModule {}
