'use client';

import { create } from 'zustand';
import { devtools, persist, createJSONStorage, type StateStorage } from 'zustand/middleware';

import type { Cart } from '@/lib/types';
import {
  addCartItem,
  applyCartCoupon,
  createCart,
  getCart,
  removeCartItem,
  updateCartItem
} from '@/lib/cart-api';

interface CartState {
  cartId?: string;
  cart?: Cart;
  status: 'idle' | 'loading' | 'ready' | 'error';
  error?: string;
  ensureCart: () => Promise<string>;
  refreshCart: () => Promise<void>;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  reset: () => void;
}

const memoryStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined
};

const storage = createJSONStorage<CartState>(() =>
  typeof window === 'undefined' ? memoryStorage : window.localStorage
);

const initialState: Pick<CartState, 'cart' | 'status' | 'error'> = {
  cart: undefined,
  status: 'idle',
  error: undefined
};

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cartId: undefined,
        ...initialState,
        async ensureCart() {
          set({ status: 'loading', error: undefined });
          try {
            const existingId = get().cartId;
            if (existingId) {
              const cart = await getCart(existingId);
              set({ cartId: cart.id, cart, status: 'ready' });
              return cart.id;
            }

            const cart = await createCart();
            set({ cartId: cart.id, cart, status: 'ready' });
            return cart.id;
          } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo inicializar el carrito';
            set({ status: 'error', error: message });
            throw error;
          }
        },
        async refreshCart() {
          const cartId = get().cartId;
          if (!cartId) {
            await get().ensureCart();
            return;
          }

          set({ status: 'loading', error: undefined });
          try {
            const cart = await getCart(cartId);
            set({ cart, status: 'ready' });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo actualizar el carrito';
            set({ status: 'error', error: message });
            throw error;
          }
        },
        async addItem(variantId, quantity) {
          const cartId = get().cartId ?? (await get().ensureCart());
          set({ status: 'loading', error: undefined });
          try {
            const cart = await addCartItem(cartId, variantId, quantity);
            set({ cart, status: 'ready' });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo añadir el producto';
            set({ status: 'error', error: message });
            throw error;
          }
        },
        async updateItem(itemId, quantity) {
          const cartId = get().cartId ?? (await get().ensureCart());
          set({ status: 'loading', error: undefined });
          try {
            const cart = await updateCartItem(cartId, itemId, quantity);
            set({ cart, status: 'ready' });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo actualizar la cantidad';
            set({ status: 'error', error: message });
            throw error;
          }
        },
        async removeItem(itemId) {
          const cartId = get().cartId ?? (await get().ensureCart());
          set({ status: 'loading', error: undefined });
          try {
            const cart = await removeCartItem(cartId, itemId);
            set({ cart, status: 'ready' });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo eliminar la línea';
            set({ status: 'error', error: message });
            throw error;
          }
        },
        async applyCoupon(code) {
          const cartId = get().cartId ?? (await get().ensureCart());
          set({ status: 'loading', error: undefined });
          try {
            const cart = await applyCartCoupon(cartId, code);
            set({ cart, status: 'ready' });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo aplicar el cupón';
            set({ status: 'error', error: message });
            throw error;
          }
        },
        reset() {
          set({ cartId: undefined, ...initialState });
        }
      }),
      {
        name: 'aurora-cart',
        storage,
        partialize: (state) => ({ cartId: state.cartId })
      }
    )
  )
);

export const resetCartStore = () => {
  useCartStore.persist?.clearStorage?.();
  useCartStore.setState({ cartId: undefined, ...initialState });
};
