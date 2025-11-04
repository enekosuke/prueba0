import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import type { CartResponse } from './models/cart.model';

const DEFAULT_TAX_RATE = 0.21;

const cartInclude = {
  include: {
    items: {
      include: {
        variant: {
          include: {
            product: {
              include: {
                prices: true
              }
            },
            inventory: true
          }
        }
      }
    },
    coupons: {
      include: {
        coupon: true
      }
    }
  }
} as const;

type CartItemRecord = {
  id: string;
  variantId: string;
  quantity: number;
  unitPrice: number | string;
  variant: {
    name: string;
    product: {
      title: string;
      slug: string;
      prices: Array<{ currency: string; amount: number | string }>;
    };
    inventory: { stock?: number } | null;
    attributes: Record<string, string>;
  };
};

type CouponRecord = {
  coupon: {
    id: string;
    code: string;
    type: string;
    value: number | string;
  };
};

type CartRecord = {
  id: string;
  currency: string;
  items: CartItemRecord[];
  coupons: CouponRecord[];
};

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async createCart(params: { userId?: string; currency?: 'EUR' | 'USD' } = {}) {
    const cart = await this.prisma.cart.create({
      data: {
        userId: params.userId ?? null,
        currency: params.currency ?? 'EUR'
      }
    });

    return this.hydrateCart(cart.id);
  }

  async getCart(id: string) {
    const cart = (await this.prisma.cart.findUnique({
      where: { id },
      ...cartInclude
    })) as CartRecord | null;

    if (!cart) {
      throw new NotFoundException('Carrito no encontrado');
    }

    return this.mapCart(cart);
  }

  async addItem(cartId: string, input: { variantId: string; quantity: number }) {
    if (input.quantity <= 0) {
      throw new BadRequestException('La cantidad debe ser positiva');
    }

    const cart = await this.prisma.cart.findUnique({ where: { id: cartId } });
    if (!cart) {
      throw new NotFoundException('Carrito no encontrado');
    }

    const variant = await this.prisma.productVariant.findUnique({
      where: { id: input.variantId },
      include: {
        product: {
          include: { prices: true }
        },
        inventory: true
      }
    });

    if (!variant) {
      throw new NotFoundException('Variante no encontrada');
    }

    const prices = variant.product.prices as Array<{ currency: string; amount: number | string }>;
    const applicablePrice = prices.find((price) => price.currency === cart.currency) ?? prices[0];

    if (!applicablePrice) {
      throw new BadRequestException('La variante no tiene un precio configurado');
    }

    const unitPriceValue = Number(applicablePrice.amount ?? 0);

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId, variantId: input.variantId }
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + input.quantity,
          unitPrice: unitPriceValue
        }
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId,
          variantId: input.variantId,
          quantity: input.quantity,
          unitPrice: unitPriceValue
        }
      });
    }

    return this.hydrateCart(cartId);
  }

  async updateItem(cartId: string, itemId: string, quantity: number) {
    if (quantity < 0) {
      throw new BadRequestException('La cantidad no puede ser negativa');
    }

    const cart = await this.prisma.cart.findUnique({ where: { id: cartId } });
    if (!cart) {
      throw new NotFoundException('Carrito no encontrado');
    }

    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item || item.cartId !== cartId) {
      throw new NotFoundException('Línea no encontrada en el carrito');
    }

    if (quantity === 0) {
      await this.prisma.cartItem.delete({ where: { id: itemId } });
    } else {
      await this.prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity }
      });
    }

    return this.hydrateCart(cartId);
  }

  async removeItem(cartId: string, itemId: string) {
    return this.updateItem(cartId, itemId, 0);
  }

  async applyCoupon(cartId: string, code: string) {
    const cart = await this.prisma.cart.findUnique({ where: { id: cartId } });
    if (!cart) {
      throw new NotFoundException('Carrito no encontrado');
    }

    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    if (!coupon) {
      throw new NotFoundException('Cupón no válido');
    }

    const now = new Date();
    if ((coupon.startsAt && coupon.startsAt > now) || (coupon.endsAt && coupon.endsAt < now)) {
      throw new BadRequestException('El cupón no está activo');
    }

    const existing = await this.prisma.cartCoupon.findUnique({
      where: {
        cartId_couponId: {
          cartId,
          couponId: coupon.id
        }
      }
    });

    if (existing) {
      throw new BadRequestException('El cupón ya se ha aplicado');
    }

    await this.prisma.cartCoupon.create({
      data: {
        cartId,
        couponId: coupon.id
      }
    });

    return this.hydrateCart(cartId);
  }

  async removeCoupon(cartId: string, couponId: string) {
    try {
      await this.prisma.cartCoupon.delete({
        where: {
          cartId_couponId: {
            cartId,
            couponId
          }
        }
      });
    } catch (error) {
      if (error instanceof Error && typeof (error as { code?: string }).code === 'string') {
        if ((error as { code?: string }).code === 'P2025') {
          throw new NotFoundException('El cupón no está asociado al carrito');
        }
      }
      throw error;
    }

    return this.hydrateCart(cartId);
  }

  private async hydrateCart(cartId: string) {
    const cart = (await this.prisma.cart.findUnique({
      where: { id: cartId },
      ...cartInclude
    })) as CartRecord | null;

    if (!cart) {
      throw new NotFoundException('Carrito no encontrado');
    }

    return this.mapCart(cart);
  }

  private mapCart(cart: CartRecord): CartResponse {
    const subtotal = cart.items.reduce((total, item) => total + Number(item.unitPrice) * item.quantity, 0);
    const discountTotal = cart.coupons.reduce(
      (total, couponRecord) => total + Number(couponRecord.coupon.value ?? 0),
      0
    );
    const taxableBase = Math.max(subtotal - discountTotal, 0);
    const taxTotal = taxableBase * DEFAULT_TAX_RATE;
    const total = taxableBase + taxTotal;

    return {
      id: cart.id,
      currency: cart.currency as 'EUR' | 'USD',
      items: cart.items.map((item) => ({
        id: item.id,
        variantId: item.variantId,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        total: Number(item.unitPrice) * item.quantity,
        variantName: item.variant.name,
        productTitle: item.variant.product.title,
        productSlug: item.variant.product.slug,
        attributes: item.variant.attributes as Record<string, string>,
        stock: item.variant.inventory?.stock ?? 0
      })),
      totals: {
        subtotal,
        discounts: discountTotal,
        taxes: taxTotal,
        total
      },
      coupons: cart.coupons.map((couponRecord) => ({
        id: couponRecord.coupon.id,
        code: couponRecord.coupon.code,
        type: couponRecord.coupon.type,
        value: Number(couponRecord.coupon.value)
      }))
    };
  }
}
