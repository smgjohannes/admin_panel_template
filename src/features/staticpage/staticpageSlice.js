import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus } from '../../constants';
import { getDefaultState } from '../../utils/getDefaultState';
import { startLoader, endLoader } from '../../utils/loader';

// get all pages
export const getPages = createAsyncThunk('page/getPages', async (query, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().page;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await getState().page.httpClient.get('/v1/content/pages', query);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// create  page
export const createPage = createAsyncThunk(
  'page/createPage',
  async (formData, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().page;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().page.httpClient.post('/v1/content/pages', formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEditPage = createAsyncThunk(
  'page/getEditPage',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().page;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, query } = params;
      const response = await getState().page.httpClient.get(`/v1/content/pages/${id}/edit`, query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const savePage = createAsyncThunk('page/savePage', async (payload, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().page;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const { id, formData } = payload;
    const response = await getState().page.httpClient.post(`/v1/content/pages/${id}`, formData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// get page
export const getPageById = createAsyncThunk(
  'page/getPageById',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().page;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, query } = params;
      const response = await getState().page.httpClient.get(`/v1/content/pages/${id}`, query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// delete page
export const deletePage = createAsyncThunk('page/deletePage', async (id, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().page;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await getState().page.httpClient.delete(`/v1/content/pages/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// activate page
export const activatePage = createAsyncThunk(
  'page/activatePage',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().page;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().page.httpClient.post(`/v1/content/pages/${id}/activate`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const uploadPageMedia = createAsyncThunk(
  'page/uploadPageMedia',
  async (payload, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().page;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, formData } = payload;
      const response = await getState().page.httpClient.post(`/v1/content/pages/${id}/media`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const uploadDocuments = createAsyncThunk(
  'page/uploadDocuments',
  async (payload, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().page;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, formData } = payload;
      const response = await getState().page.httpClient.post(`/v1/content/pages/${id}/documents`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = Object.assign({}, getDefaultState, {
  pagesGetStatus: 'idle',
  pageGetStatus: 'idle',
  pageCreateStatus: 'idle',
  pagePatchStatus: 'idle',
  pageDeleteStatus: 'idle',
  pageMediaUploadStatus: 'idle',
  pageDocumentUploadStatus: 'idle',
  pages: [],
  page: null,
  loading: 'idle',
  currentRequestId: undefined,
  totalPages: 0,
  totalItems: 0,
  count: 0,
  currentPage: 0,
  itemsPerPage: 20,
  validationErrors: null,
});

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all pages
    builder
      .addCase(getPages.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.pagesGetStatus = RequestStatus.Getting;
        }
      })
      .addCase(getPages.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.pages = action.payload.data;
          state.pagesGetStatus = RequestStatus.Success;
          state.totalItems = action.payload.meta.pagination.total;
          state.count = action.payload.meta.pagination.count;
          state.currentPage = action.payload.meta.pagination.current_page;
          state.itemsPerPage = action.payload.meta.pagination.per_page;
          state.totalPages = action.payload.meta.pagination.total_pages;
        }
      })
      .addCase(getPages.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.data.message || 'An unknown error occurred';
          state.pagesGetStatus = RequestStatus.Error;
        }
      });

    // get single page
    builder
      .addCase(getPageById.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.pageGetStatus = RequestStatus.Getting;
        }
      })
      .addCase(getPageById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.pageGetStatus = RequestStatus.Success;
          state.progress = endLoader();
          state.page = action.payload.data;
        }
      })
      .addCase(getPageById.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.data.message || 'An unknown error occurred';
          state.pageGetStatus = RequestStatus.Error;
        }
      });

    // create new page
    builder
      .addCase(createPage.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.pageCreateStatus = RequestStatus.Getting;
        }
      })
      .addCase(createPage.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.pageCreateStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(createPage.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.data.message || 'An unknown error occurred';
          state.pageCreateStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;

          if (action.payload) {
            state.error = action.payload.data?.message || 'An unknown error occurred';
            state.validationErrors = action.payload.errors || null;
          } else {
            state.error = 'An unknown error occurred';
          }
        }
      });

    // edit page
    builder
      .addCase(getEditPage.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.pageGetStatus = RequestStatus.Getting;
        }
      })
      .addCase(getEditPage.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.pageGetStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
          state.page = action.payload.data;
        }
      })
      .addCase(getEditPage.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.data.message || 'An unknown error occurred';
          state.pageGetStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // update page
    builder
      .addCase(savePage.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.pagePatchStatus = RequestStatus.Getting;
        }
      })
      .addCase(savePage.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.pagePatchStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(savePage.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.data.message || 'An unknown error occurred';
          state.pagePatchStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // delete  page
    builder
      .addCase(deletePage.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.pageDeleteStatus = RequestStatus.Getting;
        }
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.progress = endLoader();
        state.pageDeleteStatus = RequestStatus.Success;
        state.success = action.payload.data.message || 'An unknown error occurred';
      })
      .addCase(deletePage.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.data.message || 'An unknown error occurred';
          state.pageDeleteStatus = RequestStatus.Error;
        }
      });

    // upload page media
    builder
      .addCase(uploadPageMedia.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.pageMediaUploadStatus = RequestStatus.Getting;
        }
      })
      .addCase(uploadPageMedia.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.pageMediaUploadStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(uploadPageMedia.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.data.message || 'An unknown error occurred';
          state.pageMediaUploadStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // page document upload
    builder
      .addCase(uploadDocuments.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.pageDocumentUploadStatus = RequestStatus.Getting;
        }
      })
      .addCase(uploadDocuments.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.pageDocumentUploadStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(uploadDocuments.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.data.message || 'An unknown error occurred';
          state.pageDocumentUploadStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });
  },
});

export default pageSlice.reducer;
