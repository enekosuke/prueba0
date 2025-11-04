import { describe, expect, it, vi, beforeEach } from 'vitest';

import {
  addCartItem as addCartItemRequest,
  createCart as createCartRequest,
  getCart as getCartRequest
} from '@/lib/cart-api';
import type { Cart } from '@/lib/types';
import { resetCartStore, useCartStore } from '@/stores/cart-store';

vi.mock('@/lib/cart-api', () => ({
  createCart: vi.fn(),
  getCart: vi.fn(),
  addCartItem: vi.fn(),
  updateCartItem: vi.fn(),
  removeCartItem: vi.fn(),
  applyCartCoupon: vi.fn()
}));

const emptyCart: Cart = {
  id: 'cart-1',
  currency: 'EUR',
  items: [],
  totals: { subtotal: 0, discounts: 0, taxes: 0, total: 0 },
  coupons: []
};

describe('useCartStore', () => {
  beforeEach(() => {
    resetCartStore();
    vi.mocked(createCartRequest).mockReset();
    vi.mocked(getCartRequest).mockReset();
    vi.mocked(addCartItemRequest).mockReset();
  });

  it('creates a cart when none exists', async () => {
    vi.mocked(createCartRequest).mockResolvedValue(emptyCart);

    const id = await useCartStore.getState().ensureCart();

    expect(id).toBe(emptyCart.id);
    expect(useCartStore.getState().cartId).toBe(emptyCart.id);
    expect(vi.mocked(createCartRequest)).toHaveBeenCalledTimes(1);
  });

  it('adds an item reusing the persisted cart id', async () => {
    vi.mocked(createCartRequest).mockResolvedValue(emptyCart);
    vi.mocked(addCartItemRequest).mockResolvedValue({
      ...emptyCart,
      items: [
        {
          id: 'line-1',
          variantId: 'variant-1',
          variantName: 'Talla M',
          productTitle: 'Chaqueta Boreal',
          productSlug: 'chaqueta-boreal',
          attributes: { talla: 'M' },
          quantity: 1,
          unitPrice: 99,
          total: 99,
          stock: 5
        }
      ],
      totals: { subtotal: 99, discounts: 0, taxes: 20.79, total: 119.79 }
    });

    await useCartStore.getState().addItem('variant-1', 1);

    const { cart } = useCartStore.getState();
    expect(cart?.items).toHaveLength(1);
    expect(cart?.totals.total).toBeCloseTo(119.79);
  });
});
