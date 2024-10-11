import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoadingStatus, RequestStatus } from '../../constants';
import { startLoader, endLoader } from '../../utils/loader';
import { getDefaultState } from '../../utils/getDefaultState';

export const getQuizQuestions = createAsyncThunk(
  'quizQuestion/getQuizQuestions',
  async (query, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().quizQuestion;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().quizQuestion.httpClient.get('/v1/content/quiz_questions', query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getQuizQuestionById = createAsyncThunk(
  'quizQuestion/getQuizQuestionById',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().quizQuestion;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, query } = params;
      const response = await getState().quizQuestion.httpClient.get(`/v1/content/quiz_questions/${id}`, query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createQuizQuestion = createAsyncThunk(
  'quizQuestion/createQuizQuestion',
  async (formData, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().quizQuestion;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().quizQuestion.httpClient.post('/v1/content/quiz_questions', formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editQuizQuestion = createAsyncThunk(
  'quizQuestion/editQuizQuestion',
  async (payload, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().quizQuestion;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, formData } = payload;
      const response = await getState().quizQuestion.httpClient.post(`/v1/content/quiz_questions/${id}`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteQuizQuestion = createAsyncThunk(
  'quizQuestion/deleteQuizQuestion',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().quizQuestion;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().quizQuestion.httpClient.delete(`/v1/content/quiz_questions/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const publishQuizQuestion = createAsyncThunk(
  'quizQuestion/publishQuizQuestion',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().quizQuestion;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().quizQuestion.httpClient.post(`/v1/content/quiz_questions/${id}/publish`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getQuizParticipants = createAsyncThunk(
  'quizQuestion/getQuizParticipants',
  async (query, { getState, requestId, rejectWithValue }) => {
    try {
      const { httpClient } = getState().quizQuestion;

      const response = await httpClient.get(`/v1/content/quiz_participants`, query);

      if (!response || !response.data) {
        throw new Error('Invalid response structure');
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

const initialState = {
  ...getDefaultState,
  quizQuestionsGetStatus: null,
  quizQuestionGetStatus: null,
  quizQuestionCreateStatus: null,
  quizQuestionPatchStatus: null,
  quizQuestionDeleteStatus: null,
  quizQuestionPublishStatus: null,
  quizParticipantsStatus: null,
  data: [],
  quizQuestion: null,
  loading: LoadingStatus.IDLE,
  currentRequestId: undefined,
  totalPages: 0,
  totalItems: 0,
  count: 0,
  currentPage: 0,
  perPage: 20,
  participants: [],
};

export const quizQuestionSlice = createSlice({
  name: 'quizQuestion',
  initialState,
  reducers: (create) => ({}),
  extraReducers: (builder) => {
    //   get all quizQuestions
    builder
      .addCase(getQuizQuestions.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionsGetStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getQuizQuestions.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionsGetStatus = RequestStatus.Success;
          state.data = action.payload.data;
          state.progress = endLoader();
          state.total = action.payload.meta.pagination.total;
          state.count = action.payload.meta.pagination.count;
          state.currentPage = action.payload.meta.pagination.current_page;
          state.perPage = action.payload.meta.pagination.per_page;
          state.totalPages = action.payload.meta.pagination.total_pages;
        }
      })
      .addCase(getQuizQuestions.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionsGetStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
        }
      });

    //  get single quiz
    builder
      .addCase(getQuizQuestionById.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionGetStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getQuizQuestionById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionGetStatus = RequestStatus.Success;
          state.quizQuestion = action.payload.data;
          state.progress = endLoader();
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(getQuizQuestionById.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionGetStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
        }
      });

    // create new quiz
    builder
      .addCase(createQuizQuestion.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionCreateStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(createQuizQuestion.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionCreateStatus = RequestStatus.Success;
          state.progress = endLoader();
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(createQuizQuestion.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionCreateStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';

          if (action.payload.errors) {
            state.validationErrors = action.payload.errors;
          }
        }
      });

    // edit quiz
    builder
      .addCase(editQuizQuestion.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionPatchStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(editQuizQuestion.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionPatchStatus = RequestStatus.Success;
          state.progress = endLoader();
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(editQuizQuestion.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionPatchStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';

          if (action.payload.errors) {
            state.validationErrors = action.payload.errors;
          }
        }
      });

    //  delete quiz
    builder
      .addCase(deleteQuizQuestion.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionDeleteStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(deleteQuizQuestion.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionDeleteStatus = RequestStatus.Success;
          state.progress = endLoader();
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(deleteQuizQuestion.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionDeleteStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
        }
      });

    //  publish quiz
    builder
      .addCase(publishQuizQuestion.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionPublishStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(publishQuizQuestion.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionPublishStatus = RequestStatus.Success;
          state.progress = endLoader();
          state.quizQuestion = action.payload;
          state.success = action.payload.data.message || 'An unknown error occurred';
        }
      })
      .addCase(publishQuizQuestion.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.quizQuestionPublishStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload.message || 'An unknown error occurred';
        }
      });

    // participants
    builder
      .addCase(getQuizParticipants.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.quizParticipantsStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getQuizParticipants.fulfilled, (state, action) => {
        state.loading = LoadingStatus.IDLE;
        state.currentRequestId = action.meta.requestId;
        state.quizParticipantsStatus = RequestStatus.Success;
        state.progress = endLoader();
        state.participants = action.payload.data;
        state.success = action.payload.data.message || 'An unknown error occurred';
        state.total = action.payload.meta.pagination.total;
        state.count = action.payload.meta.pagination.count;
        state.currentPage = action.payload.meta.pagination.current_page;
        state.perPage = action.payload.meta.pagination.per_page;
        state.totalPages = action.payload.meta.pagination.total_pages;
      })
      .addCase(getQuizParticipants.rejected, (state, action) => {
        state.loading = LoadingStatus.IDLE;
        state.currentRequestId = action.meta.requestId;
        state.quizParticipantsStatus = RequestStatus.Error;
        state.progress = endLoader();
        state.error = action.payload.message || 'An unknown error occurred';
      });
  },
});

export default quizQuestionSlice.reducer;
