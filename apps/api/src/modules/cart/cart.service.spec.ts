import { Test } from '@nestjs/testing';
import type { TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service';

import { CartService } from './cart.service';

const euroPrice = 99.9;

const baseCart = {
  id: 'cart-id',
  currency: 'EUR',
  userId: null,
  createdAt: new Date(),
  updatedAt: new Date()
};

describe('CartService', () => {
  let service: CartService;
  let prisma: jest.Mocked<PrismaService>;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [CartService, { provide: PrismaService, useValue: createPrismaMock() }]
    }).compile();

    service = moduleRef.get(CartService);
    prisma = moduleRef.get(PrismaService) as jest.Mocked<PrismaService>;
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('creates a cart with default currency', async () => {
    prisma.cart.create.mockResolvedValue({ ...baseCart });
    prisma.cart.findUnique.mockResolvedValueOnce({ ...baseCart, items: [], coupons: [] } as never);

    const cart = await service.createCart();

    expect(prisma.cart.create).toHaveBeenCalledWith({
      data: { userId: null, currency: 'EUR' }
    });
    expect(cart.currency).toBe('EUR');
    expect(cart.items).toHaveLength(0);
  });

  it('adds a new item to the cart and recalculates totals', async () => {
    prisma.cart.findUnique.mockImplementation((args?: { include?: unknown }) => {
      if (args?.include) {
        return Promise.resolve({
          ...baseCart,
          items: [
            {
              id: 'item-1',
              cartId: 'cart-id',
              variantId: 'variant-1',
              quantity: 2,
              unitPrice: euroPrice,
              variant: {
                id: 'variant-1',
                name: 'Talla M',
                sku: 'SKU-M',
                attributes: { talla: 'M', color: 'Negro' },
                inventory: { stock: 5 },
                product: {
                  id: 'product-1',
                  title: 'Chaqueta Boreal',
                  slug: 'chaqueta-boreal',
                  prices: [{ id: 'price-1', currency: 'EUR', amount: euroPrice }]
                }
              }
            }
          ],
          coupons: []
        }) as never;
      }

      return Promise.resolve({ ...baseCart }) as never;
    });

    prisma.productVariant.findUnique.mockResolvedValue({
      id: 'variant-1',
      name: 'Talla M',
      sku: 'SKU-M',
      attributes: { talla: 'M', color: 'Negro' },
      productId: 'product-1',
      product: {
        id: 'product-1',
        title: 'Chaqueta Boreal',
        slug: 'chaqueta-boreal',
        description: '',
        heroImage: '',
        prices: [{ id: 'price-1', currency: 'EUR', amount: euroPrice }]
      },
      inventory: { stock: 5 },
      orderItems: [],
      cartItems: [],
      wishlist: []
    } as never);

    prisma.cartItem.findFirst.mockResolvedValue(null);

    const cart = await service.addItem('cart-id', { variantId: 'variant-1', quantity: 2 });

    expect(prisma.cartItem.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        cartId: 'cart-id',
        variantId: 'variant-1',
        quantity: 2
      })
    });
    expect(cart.totals.subtotal).toBeCloseTo(199.8, 2);
    expect(cart.items[0].variantName).toBe('Talla M');
  });

  it('prevents applying duplicated coupon codes', async () => {
    prisma.cart.findUnique.mockResolvedValue({ ...baseCart } as never);
    prisma.coupon.findUnique.mockResolvedValue({
      id: 'coupon-1',
      code: 'SPRING',
      value: euroPrice,
      type: 'fixed',
      used: 0,
      maxUses: null,
      startsAt: null,
      endsAt: null
    } as never);
    prisma.cartCoupon.findUnique.mockResolvedValue({ cartId: 'cart-id', couponId: 'coupon-1', appliedAt: new Date() } as never);

    await expect(service.applyCoupon('cart-id', 'SPRING')).rejects.toThrow('El cupón ya se ha aplicado');
  });
});

function createPrismaMock(): jest.Mocked<PrismaService> {
  return {
    cart: {
      create: jest.fn(),
      findUnique: jest.fn()
    },
    cartItem: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn()
    },
    cartCoupon: {
      create: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn()
    },
    coupon: {
      findUnique: jest.fn()
    },
    productVariant: {
      findUnique: jest.fn()
    }
  } as unknown as jest.Mocked<PrismaService>;
}
