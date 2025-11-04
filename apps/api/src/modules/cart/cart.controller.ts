import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CartService } from './cart.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/add-cart-item.dto';
import { ApplyCouponDto } from './dto/apply-coupon.dto';
import { CreateCartDto } from './dto/create-cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() input: CreateCartDto) {
    return this.cartService.createCart(input);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.cartService.getCart(id);
  }

  @Post(':id/items')
  addItem(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() input: AddCartItemDto
  ) {
    return this.cartService.addItem(id, input);
  }

  @Patch(':cartId/items/:itemId')
  updateItem(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
    @Body() input: UpdateCartItemDto
  ) {
    return this.cartService.updateItem(cartId, itemId, input.quantity);
  }

  @Delete(':cartId/items/:itemId')
  removeItem(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string
  ) {
    return this.cartService.removeItem(cartId, itemId);
  }

  @Post(':id/coupons')
  applyCoupon(
    @Param('id', new ParseUUIDPipe()) cartId: string,
    @Body() input: ApplyCouponDto
  ) {
    return this.cartService.applyCoupon(cartId, input.code);
  }

  @Delete(':cartId/coupons/:couponId')
  removeCoupon(
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('couponId', new ParseUUIDPipe()) couponId: string
  ) {
    return this.cartService.removeCoupon(cartId, couponId);
  }
}
