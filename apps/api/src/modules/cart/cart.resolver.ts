import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CartService } from './cart.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/add-cart-item.dto';
import { ApplyCouponDto } from './dto/apply-coupon.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartModel } from './models/cart.model';

@Resolver(() => CartModel)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => CartModel)
  cart(@Args('id') id: string) {
    return this.cartService.getCart(id).then(CartModel.fromResponse);
  }

  @Mutation(() => CartModel)
  createCart(@Args('input', { type: () => CreateCartDto, nullable: true }) input?: CreateCartDto) {
    return this.cartService.createCart(input ?? {}).then(CartModel.fromResponse);
  }

  @Mutation(() => CartModel)
  addCartItem(
    @Args('cartId') cartId: string,
    @Args('input', { type: () => AddCartItemDto }) input: AddCartItemDto
  ) {
    return this.cartService.addItem(cartId, input).then(CartModel.fromResponse);
  }

  @Mutation(() => CartModel)
  updateCartItem(
    @Args('cartId') cartId: string,
    @Args('itemId') itemId: string,
    @Args('input', { type: () => UpdateCartItemDto }) input: UpdateCartItemDto
  ) {
    return this.cartService.updateItem(cartId, itemId, input.quantity).then(CartModel.fromResponse);
  }

  @Mutation(() => CartModel)
  removeCartItem(@Args('cartId') cartId: string, @Args('itemId') itemId: string) {
    return this.cartService.removeItem(cartId, itemId).then(CartModel.fromResponse);
  }

  @Mutation(() => CartModel)
  applyCartCoupon(
    @Args('cartId') cartId: string,
    @Args('input', { type: () => ApplyCouponDto }) input: ApplyCouponDto
  ) {
    return this.cartService.applyCoupon(cartId, input.code).then(CartModel.fromResponse);
  }

  @Mutation(() => CartModel)
  removeCartCoupon(@Args('cartId') cartId: string, @Args('couponId') couponId: string) {
    return this.cartService.removeCoupon(cartId, couponId).then(CartModel.fromResponse);
  }
}
