import { describe, expect, it } from 'vitest';

import { formatMoney } from '..';

describe('formatMoney', () => {
  it('returns formatted euros with symbol', () => {
    expect(formatMoney(123.45, 'EUR')).toBe('€123.45');
  });

  it('returns formatted usd with symbol', () => {
    expect(formatMoney(50, 'USD')).toBe('$50.00');
  });
});
