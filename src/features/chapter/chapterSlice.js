import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoadingStatus, RequestStatus } from '../../constants';
import { getDefaultState } from '../../utils/getDefaultState';
import { startLoader, endLoader } from '../../utils/loader';

// get all chapters
export const getChapters = createAsyncThunk(
  'chapter/getChapters',
  async (query, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().chapter;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().chapter.httpClient.get('/v1/content/chapters', query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// create  chapter
export const createChapter = createAsyncThunk(
  'chapter/createChapter',
  async (formData, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().chapter;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().chapter.httpClient.post('/v1/content/chapters', formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEditChapter = createAsyncThunk(
  'chapter/getEditChapter',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().chapter;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().chapter.httpClient.get(`/v1/content/chapters/${id}/edit`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const saveChapter = createAsyncThunk(
  'chapter/saveChapter',
  async (payload, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().chapter;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, formData } = payload;
      const response = await getState().chapter.httpClient.post(`/v1/content/chapters/${id}`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get chapter
export const getChapterById = createAsyncThunk(
  'chapter/getChapterById',
  async (queryParams, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().chapter;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, query } = queryParams;
      const response = await getState().chapter.httpClient.get(`/v1/content/chapters/${id}`, query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// delete chapter
export const deleteChapter = createAsyncThunk(
  'chapter/deleteChapter',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().chapter;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().chapter.httpClient.delete(`/v1/content/chapters/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const uploadChapterAudio = createAsyncThunk(
  'chapter/uploadChapterAudio',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().chapter;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, formData } = params;
      const response = await getState().chapter.httpClient.post(`/v1/content/chapters/${id}/media`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  ...getDefaultState,
  chaptersGetStatus: null,
  chapterGetStatus: null,
  chapterCreateStatus: null,
  chapterPatchStatus: null,
  chapterDeleteStatus: null,
  chapterUploadStatus: null,
  chapters: [],
  chapter: null,
  loading: 'idle',
  currentRequestId: undefined,
  totalPages: 0,
  totalItems: 0,
  count: 0,
  currentPage: 0,
  itemsPerPage: 20,
};

export const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: (create) => ({}),

  extraReducers: (builder) => {
    // get all chapters
    builder
      .addCase(getChapters.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.chaptersGetStatus = RequestStatus.Getting;
        }
      })
      .addCase(getChapters.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.chapters = action.payload.data;
          state.chaptersGetStatus = RequestStatus.Success;
          state.totalItems = action.payload.meta.pagination.total;
          state.count = action.payload.meta.pagination.count;
          state.currentPage = action.payload.meta.pagination.current_page;
          state.itemsPerPage = action.payload.meta.pagination.per_page;
          state.totalPages = action.payload.meta.pagination.total_pages;
        }
      })
      .addCase(getChapters.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.data;
          state.chaptersGetStatus = RequestStatus.Error;
        }
      });

    // get single chapter
    builder
      .addCase(getChapterById.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.chapterGetStatus = RequestStatus.Getting;
        }
      })
      .addCase(getChapterById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.chapterGetStatus = RequestStatus.Success;
          state.progress = endLoader();
          state.chapter = action.payload.data;
        }
      })
      .addCase(getChapterById.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload;
          state.chapterGetStatus = RequestStatus.Error;
        }
      });

    // create new chapter
    builder
      .addCase(createChapter.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.chapterCreateStatus = RequestStatus.Getting;
        }
      })
      .addCase(createChapter.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.chapterCreateStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(createChapter.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload;
          state.chapterCreateStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // edit chapter
    builder
      .addCase(getEditChapter.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.chapterGetStatus = RequestStatus.Getting;
        }
      })
      .addCase(getEditChapter.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.chapter = action.payload.data;
          state.progress = endLoader();
          state.chapterGetStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(getEditChapter.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload;
          state.chapterGetStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // edit chapter
    builder
      .addCase(saveChapter.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.chapterPatchStatus = RequestStatus.Getting;
        }
      })
      .addCase(saveChapter.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.chapterPatchStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(saveChapter.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload;
          state.chapterPatchStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // delete  chapter
    builder
      .addCase(deleteChapter.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.chapterDeleteStatus = RequestStatus.Getting;
        }
      })
      .addCase(deleteChapter.fulfilled, (state, action) => {
        state.progress = endLoader();
        state.chapterDeleteStatus = RequestStatus.Success;
        state.success = action.payload.data.message || 'An unknown error occurred';
      })
      .addCase(deleteChapter.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload;
          state.chapterDeleteStatus = RequestStatus.Error;
        }
      });

    // upload media
    builder
      .addCase(uploadChapterAudio.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.chapterUploadStatus = RequestStatus.Getting;
        }
      })
      .addCase(uploadChapterAudio.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.chapterUploadStatus = RequestStatus.Success;
          state.success = action.payload.message || 'An unknown error occurred';
        }
      })
      .addCase(uploadChapterAudio.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.chapterUploadStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });
  },
});

export default chapterSlice.reducer;
