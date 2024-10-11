import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus, LoadingStatus } from '../../constants';
import { getDefaultState } from '../../utils/getDefaultState';
import { startLoader, endLoader } from '../../utils/loader';

// CURRENT USER
export const getMySelf = createAsyncThunk('user/getMySelf', async (_, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().user;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await getState().user.httpClient.get('/v1/user');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// USERS
export const getUsers = createAsyncThunk('user/getUsers', async (query, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().user;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    const response = await getState().user.httpClient.get('/v1/users', query);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (params, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().user;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().user.httpClient.get(`/v1/users/${params.id}`, params.query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const saveUser = createAsyncThunk(
  'user/saveUser',
  async (formData, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().user;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().user.httpClient.post(`/v1/user`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (formData, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().user;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().user.httpClient.post(`/v1/users`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().user;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const { id, formData } = payload;
      const response = await getState().user.httpClient.post(`/v1/users/${id}`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().user;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await getState().user.httpClient.delete(`/v1/users/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  ...getDefaultState,
  usersGetStatus: null,
  userGetStatus: null,
  userCreateStatus: null,
  userPatchStatus: null,
  userDeleteStatus: null,
  user: null,
  users: [],
  success: '',
  error: '',
  loading: LoadingStatus.IDLE,
  totalPages: 0,
  totalItems: 0,
  count: 0,
  currentPage: 0,
  perPage: 20,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    // get current user
    builder
      .addCase(getMySelf.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.userGetStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getMySelf.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.user = action.payload.data;
          state.userGetStatus = RequestStatus.Success;
          state.progress = endLoader();
          if (action.payload && action.payload.meta && action.payload.meta.pagination) {
            state.totalItems = action.payload.meta.pagination.total;
            state.count = action.payload.meta.pagination.count;
            state.currentPage = action.payload.meta.pagination.current_page;
            state.perPage = action.payload.meta.pagination.per_page;
            state.totalPages = action.payload.meta.pagination.total_pages;
          }
        }
      })
      .addCase(getMySelf.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.userGetStatus = RequestStatus.Error;
          state.error = action.payload.data;
          state.progress = endLoader();
        }
      });

    // update current user
    builder
      .addCase(saveUser.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.userPatchStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.success = action.payload.data.message || 'An unknown error occurred';
          state.user = action.payload.user;
          state.token.saveUser(action.payload.user);
          state.userPatchStatus = RequestStatus.Success;
        }
      })
      .addCase(saveUser.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.userPatchStatus = RequestStatus.Error;
          state.error = action.payload.data;
          if (action.payload.errors) state.validationErrors = action.payload.errors;
          state.progress = endLoader();
        }
      });

    // get all users
    builder
      .addCase(getUsers.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.usersGetStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.users = action.payload.data;
          state.usersGetStatus = RequestStatus.Success;
        }
      })
      .addCase(getUsers.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.usersGetStatus = RequestStatus.Error;
          state.error = action.payload.data;
          state.progress = endLoader();
        }
      });

    // create user
    builder
      .addCase(createUser.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.userCreateStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.success = action.payload.data.message || 'An unknown error occurred';
          state.userCreateStatus = RequestStatus.Success;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.userCreateStatus = RequestStatus.Error;
          state.error = action.payload.data;
          state.progress = endLoader();
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // get single user
    builder
      .addCase(getUserById.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.userGetStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.user = action.payload.data;
          state.userGetStatus = RequestStatus.Success;
        }
      })
      .addCase(getUserById.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.userGetStatus = RequestStatus.Error;
          state.error = action.payload.data;
          state.progress = endLoader();
        }
      });

    // edit user
    builder
      .addCase(updateUser.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.userPatchStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.success = action.payload.data.message || 'An unknown error occurred';
          state.userPatchStatus = RequestStatus.Success;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.userPatchStatus = RequestStatus.Error;
          state.error = action.payload.data;
          state.progress = endLoader();
          if (action.payload.errors) state.validationErrors = action.payload.errors;
        }
      });

    // delete user
    builder
      .addCase(deleteUser.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.userDeleteStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.progress = endLoader();
          state.success = action.payload.data.message || 'An unknown error occurred';
          state.userDeleteStatus = RequestStatus.Success;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = action.meta.requestId;
          state.userDeleteStatus = RequestStatus.Error;
          state.error = action.payload.data;
          state.progress = endLoader();
        }
      });
  },
});

export default userSlice.reducer;
