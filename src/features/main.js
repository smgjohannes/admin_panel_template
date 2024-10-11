import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus, LoadingStatus } from '../constants';
import { getDefaultState } from '../utils/getDefaultState';
import { Routes } from '../routes';

export const checkLogin = createAsyncThunk(
  'main/checkLogin',
  async (navigate, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().main;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }

      await getState().main.token.init();
      if (!getState().main.token.isConnected()) {
        navigate(Routes.Login.path);
      }

      const response = await getState().main.httpClient.get('/v1/user');

      if (response.data.message === 'Unauthenticated.') {
        getState().main.token.reset();
        navigate(Routes.Login.path);
      }
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const logout = createAsyncThunk('main/logout', async (navigate, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().main;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    const user = getState().main.token.getUser();

    if (user && user.access_token) {
      await getState().main.httpClient.post('/auth/logout');
    }

    getState().main.token.reset();
    navigate(Routes.Login.path);
  } catch (e) {
    return rejectWithValue(e.response.data);
  }
});

const initialState = {
  ...getDefaultState,
  logoutStatus: null,
  loading: LoadingStatus.IDLE,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: (create) => ({
    startLoader: create.reducer((state) => {
      let i = Math.floor(Math.random() * 40) + 10;
      state.progress = i;
    }),
    endLoader: create.reducer((state) => {
      state.progress = 100;
    }),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(checkLogin.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
        }
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
        }
      })
      .addCase(checkLogin.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.token.reset();
        }
      });
    builder
      .addCase(logout.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.logoutStatus = RequestStatus.Getting;
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.logoutStatus = RequestStatus.Success;
        }
      })
      .addCase(logout.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.logoutStatus = RequestStatus.Error;
          state.error = action.payload.message;
          state.token.reset();
        }
      });
  },
});

export const { startLoader, endLoader } = mainSlice.actions;

export default mainSlice.reducer;
