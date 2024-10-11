import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoadingStatus, RequestStatus } from '../../constants';
import { startLoader, endLoader } from '../../utils/loader';
import { getDefaultState } from '../../utils/getDefaultState';

export const getAllMedia = createAsyncThunk(
  'media/getAllMedia',
  async (query, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().media;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().media.httpClient.get('/v1/content/media', query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMediaById = createAsyncThunk(
  'media/getMediaById',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().media;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().media.httpClient.get(`/v1/content/media/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteMedia = createAsyncThunk(
  'media/deleteMedia',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().media;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().media.httpClient.delete(`/v1/content/media/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  ...getDefaultState,
  mediasGetStatus: null,
  mediaGetStatus: null,
  mediaDeleteStatus: null,
  data: null,
  media: null,
  loading: LoadingStatus.IDLE,
  currentRequestId: undefined,
  totalPages: 0,
  totalItems: 0,
  count: 0,
  currentPage: 0,
  perPage: 0,
};

export const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: (create) => ({}),
  extraReducers: (builder) => {
    builder
      .addCase(getAllMedia.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.mediasGetStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getAllMedia.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.mediasGetStatus = RequestStatus.Success;
          state.data = action.payload.data;
          state.totalItems = action.payload.meta.pagination.total;
          state.count = action.payload.meta.pagination.count;
          state.currentPage = action.payload.meta.pagination.current_page;
          state.itemsPerPage = action.payload.meta.pagination.per_page;
          state.totalPages = action.payload.meta.pagination.total_pages;
          state.progress = endLoader();
        }
      })
      .addCase(getAllMedia.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.mediasGetStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload;
        }
      });

    builder
      .addCase(getMediaById.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.mediaGetStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getMediaById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.mediaGetStatus = RequestStatus.Success;
          state.progress = endLoader();
          state.media = action.payload.data;
        }
      })
      .addCase(getMediaById.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.mediaGetStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload;
        }
      });

    builder
      .addCase(deleteMedia.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.mediaDeleteStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.mediaDeleteStatus = RequestStatus.Success;
          state.progress = endLoader();
        }
      })
      .addCase(deleteMedia.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.mediaDeleteStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload;
        }
      });
  },
});

export default mediaSlice.reducer;
