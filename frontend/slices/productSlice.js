import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

const initialState = {
  items: [],
  product: null,
  page: 1,
  limit: 24,
  total: 0,
  totalPages: 1,
  suggestions: [],
  status: 'idle',
  error: null,
  filters: {
    q: '',
    category: '',
    minPrice: 5,
    maxPrice: 200
  }
};

export const fetchProducts = createAsyncThunk('products/fetch', async (params = {}) => {
  const data = await api.get('/products', { params });
  return data;
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
  const data = await api.get(`/products/${id}`);
  return data;
});

export const fetchSuggestions = createAsyncThunk('products/suggestions', async (query) => {
  const data = await api.get('/products/suggestions', { params: { query } });
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.products;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.product = null;
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      });
  }
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
