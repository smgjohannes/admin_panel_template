import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoadingStatus, RequestStatus } from '../../constants';
import { getDefaultState } from '../../utils/getDefaultState';
import { startLoader, endLoader } from '../../utils/loader';

// get all articles
export const getArticles = createAsyncThunk(
  'article/getArticles',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().article.httpClient.get('/v1/content/articles', params);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// create article
export const createArticle = createAsyncThunk(
  'article/createArticle',
  async (formData, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().article.httpClient.post('/v1/content/articles', formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEditArticle = createAsyncThunk(
  'article/getEditArticle',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, query } = params;
      const response = await getState().article.httpClient.get(`/v1/content/articles/${id}/edit`, query);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, formData } = params;
      const response = await getState().article.httpClient.post(`/v1/content/articles/${id}`, formData);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

// delete article
export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().article.httpClient.delete(`/v1/content/articles/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getArticleById = createAsyncThunk(
  'article/getArticleById',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, query } = params;
      const response = await getState().article.httpClient.get(`/v1/content/articles/${id}`, query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getArticleBySlug = createAsyncThunk(
  'article/getArticleBySlug',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }

      const { slug, query } = params;

      const response = await getState().article.httpClient.get(`/v1/content/articles/${slug}/getBySlug`, query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getArticleByNumber = createAsyncThunk(
  'article/getArticleByNumber',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }

      const { number, query } = params;

      const response = await getState().article.httpClient.get(`/v1/content/articles/${number}/getByNumber`, query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const publishArticle = createAsyncThunk(
  'article/publishArticle',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().article.httpClient.post(`/v1/content/articles/${id}/publish`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const uploadArticleMedia = createAsyncThunk(
  'article/uploadArticleMedia',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, formData } = params;
      const response = await getState().article.httpClient.post(`/v1/content/articles/${id}/media`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getArticlesByChapterId = createAsyncThunk(
  'article/getArticlesByChapterId',
  async (queryParams, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().article;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { chapterId, params } = queryParams;
      const response = await getState().article.httpClient.get(`/v1/content/chapters/${chapterId}/articles`, params);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  ...getDefaultState,
  articlesGetStatus: null,
  articleGetStatus: null,
  articleCreateStatus: null,
  articlePatchStatus: null,
  articleDeleteStatus: null,
  articleUploadStatus: null,
  articles: [],
  article: null,
  loading: LoadingStatus.IDLE,
  currentRequestId: undefined,
  totalPages: 0,
  totalItems: 0,
  count: 0,
  currentPage: 0,
  itemsPerPage: 20,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: (create) => ({}),
  extraReducers: (builder) => {
    // get all articles
    builder
      .addCase(getArticles.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articlesGetStatus = RequestStatus.Getting;
        }
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.articles = action.payload.data;
          state.totalItems = action.payload.meta.pagination.total;
          state.count = action.payload.meta.pagination.count;
          state.currentPage = action.payload.meta.pagination.current_page;
          state.itemsPerPage = action.payload.meta.pagination.per_page;
          state.totalPages = action.payload.meta.pagination.total_pages;
          state.articlesGetStatus = RequestStatus.Success;
        }
      })
      .addCase(getArticles.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articlesGetStatus = RequestStatus.Error;
        }
      });

    // get single article
    builder
      .addCase(getArticleById.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articleGetStatus = RequestStatus.Getting;
        }
        state.article = null;
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.articleGetStatus = RequestStatus.Success;
          state.progress = endLoader();
          state.article = action.payload.data;
        }
      })
      .addCase(getArticleById.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articleGetStatus = RequestStatus.Error;
        }
      });

    // create new article
    builder
      .addCase(createArticle.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articleCreateStatus = RequestStatus.Getting;
        }
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.articleCreateStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(createArticle.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articleCreateStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // edit article
    builder
      .addCase(getEditArticle.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articleGetStatus = RequestStatus.Getting;
        }
      })
      .addCase(getEditArticle.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.article = action.payload.data;
          state.progress = endLoader();
          state.articleGetStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(getEditArticle.rejected, (state, action) => {
        const { requestId } = action.meta;
        console.log(action.payload);
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articleGetStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // update article
    builder
      .addCase(updateArticle.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articlePatchStatus = RequestStatus.Getting;
        }
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.articlePatchStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        const { requestId } = action.meta;
        console.log(action.payload);
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articlePatchStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // delete  article
    builder
      .addCase(deleteArticle.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articleDeleteStatus = RequestStatus.Getting;
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.articleDeleteStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articleDeleteStatus = RequestStatus.Error;
        }
      });

    // publish article
    builder
      .addCase(publishArticle.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articlePatchStatus = RequestStatus.Getting;
        }
      })
      .addCase(publishArticle.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.articlePatchStatus = RequestStatus.Success;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(publishArticle.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articlePatchStatus = RequestStatus.Error;
        }
      });

    // get article by slug
    builder
      .addCase(getArticleBySlug.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articleGetStatus = RequestStatus.Getting;
        }
        state.article = null;
      })
      .addCase(getArticleBySlug.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.articleGetStatus = RequestStatus.Success;
          state.article = action.payload.data;
        }
      })
      .addCase(getArticleBySlug.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articleGetStatus = RequestStatus.Error;
        }
      });

    // get article by number
    builder
      .addCase(getArticleByNumber.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articleGetStatus = RequestStatus.Getting;
        }
        state.article = null;
      })
      .addCase(getArticleByNumber.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.articleGetStatus = RequestStatus.Success;
          state.article = action.payload.data;
        }
      })
      .addCase(getArticleByNumber.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articleGetStatus = RequestStatus.Error;
        }
      });

    // upload media
    builder
      .addCase(uploadArticleMedia.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articleUploadStatus = RequestStatus.Getting;
        }
      })
      .addCase(uploadArticleMedia.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.articleUploadStatus = RequestStatus.Success;
          state.success = action.payload.message || 'An unknown error occurred';
        }
      })
      .addCase(uploadArticleMedia.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articleUploadStatus = RequestStatus.Error;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    builder
      .addCase(getArticlesByChapterId.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.progress = startLoader();
          state.articlesGetStatus = RequestStatus.Getting;
          state.articles = [];
        }
      })
      .addCase(getArticlesByChapterId.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.articlesGetStatus = RequestStatus.Success;
          state.success = action.payload.message || 'An unknown error occurred';
          state.articles = action.payload.data;
          state.totalItems = action.payload.meta.pagination.total;
          state.count = action.payload.meta.pagination.count;
          state.currentPage = action.payload.meta.pagination.current_page;
          state.itemsPerPage = action.payload.meta.pagination.per_page;
          state.totalPages = action.payload.meta.pagination.total_pages;
        }
      })
      .addCase(getArticlesByChapterId.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
          state.articles = [];
        }
      });
  },
});

export default articleSlice.reducer;
