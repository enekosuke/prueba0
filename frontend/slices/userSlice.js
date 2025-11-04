import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { setCookie, destroyCookie } from 'nookies';

const initialState = {
  profile: null,
  favourites: [],
  orders: [],
  status: 'idle',
  error: null
};

export const login = createAsyncThunk('user/login', async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  setCookie(null, 'lumina_token', data.token, { path: '/', maxAge: 60 * 60 * 24 * 7 });
  return data;
});

export const socialLogin = createAsyncThunk('user/socialLogin', async ({ provider, token }) => {
  const { data } = await api.post(`/auth/oauth/${provider}`, { token });
  setCookie(null, 'lumina_token', data.token, { path: '/', maxAge: 60 * 60 * 24 * 7 });
  return data;
});

export const fetchProfile = createAsyncThunk('user/profile', async () => {
  const { data } = await api.get('/users/me');
  return data;
});

export const logout = createAsyncThunk('user/logout', async () => {
  await api.post('/auth/logout');
  destroyCookie(null, 'lumina_token');
  return null;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateLocalProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.user;
        state.orders = action.payload.orders;
        state.favourites = action.payload.favourites;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.orders = action.payload.orders;
        state.favourites = action.payload.favourites;
        state.status = 'succeeded';
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        state.profile = action.payload.user;
        state.orders = action.payload.orders;
        state.favourites = action.payload.favourites;
        state.status = 'succeeded';
      })
      .addCase(logout.fulfilled, () => initialState);
  }
});

export const { updateLocalProfile } = userSlice.actions;
export default userSlice.reducer;
