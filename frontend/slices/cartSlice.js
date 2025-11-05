import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

const initialState = {
  items: [],
  subtotal: 0,
  shipping: 0,
  taxes: 0,
  total: 0,
  status: 'idle',
  error: null
};

export const fetchCart = createAsyncThunk('cart/fetch', async () => {
  const { data } = await api.get('/cart');
  return data;
});

export const addToCart = createAsyncThunk('cart/add', async ({ productId, quantity }) => {
  const { data } = await api.post('/cart/items', { productId, quantity });
  return data;
});

export const removeFromCart = createAsyncThunk('cart/remove', async (itemId) => {
  const { data } = await api.delete(`/cart/items/${itemId}`);
  return data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    optimisticAdd(state, action) {
      const { product, quantity } = action.payload;
      const productId = product._id || product.id;
      const existing = state.items.find((item) => {
        const itemId = item.product._id || item.product.id;
        return itemId === productId;
      });
      const basePrice = Number(product.price) || 0;
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ _id: `temp-${Date.now()}`, product, quantity });
      }
      state.subtotal += basePrice * quantity;
      state.total = state.subtotal + state.shipping + state.taxes;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.shipping = action.payload.shipping;
        state.taxes = action.payload.taxes;
        state.total = action.payload.total;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = 'succeeded';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = 'succeeded';
      });
  }
});

export const { optimisticAdd } = cartSlice.actions;
export default cartSlice.reducer;
