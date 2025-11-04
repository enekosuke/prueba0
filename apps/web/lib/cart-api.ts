import type { Cart } from './types';
import { fetchJson } from './api';

export type CartResponse = Cart;

export const createCart = () =>
  fetchJson<CartResponse>('/cart', {
    method: 'POST',
    body: JSON.stringify({})
  });

export const getCart = (cartId: string) =>
  fetchJson<CartResponse>(`/cart/${cartId}`, {
    method: 'GET',
    cache: 'no-store'
  });

export const addCartItem = (cartId: string, variantId: string, quantity: number) =>
  fetchJson<CartResponse>(`/cart/${cartId}/items`, {
    method: 'POST',
    body: JSON.stringify({ variantId, quantity }),
    cache: 'no-store'
  });

export const updateCartItem = (cartId: string, itemId: string, quantity: number) =>
  fetchJson<CartResponse>(`/cart/${cartId}/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
    cache: 'no-store'
  });

export const removeCartItem = (cartId: string, itemId: string) =>
  fetchJson<CartResponse>(`/cart/${cartId}/items/${itemId}`, {
    method: 'DELETE',
    cache: 'no-store'
  });

export const applyCartCoupon = (cartId: string, code: string) =>
  fetchJson<CartResponse>(`/cart/${cartId}/coupons`, {
    method: 'POST',
    body: JSON.stringify({ code }),
    cache: 'no-store'
  });
