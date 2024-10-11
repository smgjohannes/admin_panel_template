import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoadingStatus, LoginStatus } from '../../constants';
import { startLoader, endLoader } from '../../utils/loader';
import { getDefaultState } from '../../utils/getDefaultState';

export const login = createAsyncThunk('auth/login', async (formData, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().auth;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    await getState().auth.httpClient.get('sanctum/csrf-cookie');
    const response = await getState().auth.httpClient.post('/auth/login', formData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  ...getDefaultState,
  loginStatus: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({}),
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state, action) => {
        if (state.loading === LoadingStatus.IDLE) {
          state.loading = LoadingStatus.PENDING;
          state.currentRequestId = action.meta.requestId;
          state.loginStatus = LoginStatus.Processing;
          state.progress = startLoader();
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = undefined;
          state.progress = endLoader();
          state.loginStatus = LoginStatus.LoginSuccess;
          state.success = action.payload.message;
          const user = Object.assign({}, action.payload.user, {
            access_token: action.payload.access_token,
          });
          state.user = user;
          state.token.saveUser(user);
          state.token.init();
        }
      })
      .addCase(login.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === LoadingStatus.PENDING && state.currentRequestId === requestId) {
          state.loading = LoadingStatus.IDLE;
          state.currentRequestId = undefined;
          state.loginStatus = LoginStatus.WrongCredentialsError;
          state.error = action.payload;
          state.progress = endLoader();
          state.validationErrors = action.payload.errors;
        }
      });
  },
});

export default authSlice.reducer;
