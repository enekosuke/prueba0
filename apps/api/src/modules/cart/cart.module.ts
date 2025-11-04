import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { CartController } from './cart.controller';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  imports: [PrismaModule],
  providers: [CartService, CartResolver],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
