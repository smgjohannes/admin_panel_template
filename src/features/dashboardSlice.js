import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus, LoadingStatus } from '../constants';
import { getDefaultState } from '../utils/getDefaultState';

export const getDashboard = createAsyncThunk(
  'dashboard/getDashboard',
  async (_, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().dashboard;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().dashboard.httpClient.get('/v1/content/dashboard');
      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  ...getDefaultState,
  dashboardGetStatus: null,
  dashboard: {
    totalChapters: 0,
    totalArticles: 0,
    totalAudios: 0,
    totalQuizzes: 0,
  },
  loading: LoadingStatus.IDLE,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
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
      .addCase(getDashboard.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.dashboardGetStatus = RequestStatus.Getting;
        }
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.dashboardGetStatus = RequestStatus.Success;
          state.dashboard = action.payload.data;
        }
      })
      .addCase(getDashboard.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.dashboardGetStatus = RequestStatus.Error;
        }
      });
  },
});

export const { startLoader, endLoader } = dashboardSlice.actions;

export default dashboardSlice.reducer;
