import { Field, Float, ObjectType } from '@nestjs/graphql';

export interface CartItemResponse {
  id: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  total: number;
  variantName: string;
  productTitle: string;
  productSlug: string;
  attributes: Record<string, string>;
  stock: number;
}

export interface CartTotalsResponse {
  subtotal: number;
  discounts: number;
  taxes: number;
  total: number;
}

export interface CartCouponResponse {
  id: string;
  code: string;
  type: string;
  value: number;
}

export interface CartResponse {
  id: string;
  currency: 'EUR' | 'USD';
  items: CartItemResponse[];
  totals: CartTotalsResponse;
  coupons: CartCouponResponse[];
}

@ObjectType()
export class CartTotalsModel implements CartTotalsResponse {
  @Field(() => Float)
  subtotal!: number;

  @Field(() => Float)
  discounts!: number;

  @Field(() => Float)
  taxes!: number;

  @Field(() => Float)
  total!: number;
}

@ObjectType()
export class CartCouponModel implements CartCouponResponse {
  @Field()
  id!: string;

  @Field()
  code!: string;

  @Field()
  type!: string;

  @Field(() => Float)
  value!: number;
}

@ObjectType()
export class CartItemAttributeModel {
  @Field()
  key!: string;

  @Field()
  value!: string;
}

@ObjectType()
export class CartItemModel {
  @Field()
  id!: string;

  @Field()
  variantId!: string;

  @Field()
  variantName!: string;

  @Field()
  productTitle!: string;

  @Field()
  productSlug!: string;

  @Field(() => Float)
  unitPrice!: number;

  @Field(() => Float)
  total!: number;

  @Field()
  quantity!: number;

  @Field(() => [CartItemAttributeModel])
  attributes!: CartItemAttributeModel[];

  @Field(() => Float)
  stock!: number;

  static fromResponse(item: CartItemResponse): CartItemModel {
    const model = new CartItemModel();
    model.id = item.id;
    model.variantId = item.variantId;
    model.variantName = item.variantName;
    model.productTitle = item.productTitle;
    model.productSlug = item.productSlug;
    model.unitPrice = item.unitPrice;
    model.total = item.total;
    model.quantity = item.quantity;
    model.stock = item.stock;
    model.attributes = Object.entries(item.attributes).map(([key, value]) => ({ key, value }));
    return model;
  }
}

@ObjectType()
export class CartModel {
  @Field()
  id!: string;

  @Field()
  currency!: 'EUR' | 'USD';

  @Field(() => [CartItemModel])
  items!: CartItemModel[];

  @Field(() => CartTotalsModel)
  totals!: CartTotalsModel;

  @Field(() => [CartCouponModel])
  coupons!: CartCouponModel[];

  static fromResponse(cart: CartResponse): CartModel {
    const model = new CartModel();
    model.id = cart.id;
    model.currency = cart.currency;
    model.items = cart.items.map(CartItemModel.fromResponse);
    model.totals = cart.totals;
    model.coupons = cart.coupons;
    return model;
  }
}
