import { describe, expect, it } from 'vitest';

import { CartSchema, ProductSchema } from '..';

describe('schemas', () => {
  it('validates a minimal product payload', () => {
    const result = ProductSchema.safeParse({
      id: '00000000-0000-0000-0000-000000000000',
      slug: 'producto-demo',
      title: 'Producto demo',
      description: 'Descripción breve',
      images: ['https://example.com/image.webp'],
      variants: [],
      categories: [],
      rating: 4.5
    });

    expect(result.success).toBe(true);
  });

  it('computes cart totals schema', () => {
    const result = CartSchema.safeParse({
      id: '11111111-1111-1111-1111-111111111111',
      items: [
        { productId: '22222222-2222-2222-2222-222222222222', variantId: '33333333-3333-3333-3333-333333333333', quantity: 1 }
      ],
      currency: 'EUR',
      subtotal: 100,
      discounts: 10,
      taxes: 18.9,
      total: 108.9
    });

    expect(result.success).toBe(true);
  });
});
