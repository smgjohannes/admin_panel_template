import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestStatus } from '../../constants';
import { startLoader, endLoader } from '../../utils/loader';
import { getDefaultState } from '../utils/getDefaultState';

export const getAllMenu = createAsyncThunk(
  'menu/getAllMenu',
  async (query, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().menu;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().menu.httpClient.get('/v1/content/menu', query);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMenuById = createAsyncThunk(
  'menu/getMenuById',
  async (id, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().menu;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().menu.httpClient.get(`/v1/content/menu/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createMenu = createAsyncThunk(
  'menu/createMenu',
  async (payload, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().menu;
      if (loading !== 'pending' || requestId !== currentRequestId) {
        return;
      }
      const response = await getState().menu.httpClient.post('/v1/content/menu', payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editMenu = createAsyncThunk('menu/editMenu', async (data, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().menu;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const { id, formData } = data;
    const response = await getState().menu.httpClient.patch(`/v1/content/menu/${id}`, formData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const deleteMenu = createAsyncThunk('menu/deleteMenu', async (id, { getState, requestId, rejectWithValue }) => {
  try {
    const { currentRequestId, loading } = getState().menu;
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }
    const response = await getState().menu.httpClient.delete(`/v1/content/menu/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  ...getDefaultState,
  menusGetStatus: null,
  menuGetStatus: null,
  menuCreateStatus: null,
  menuPatchStatus: null,
  menuDeleteStatus: null,
  menus: [],
  menu: null,
  loading: 'idle',
  currentRequestId: undefined,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: (create) => ({}),

  extraReducers: (builder) => {
    //   get all menus
    builder
      .addCase(getAllMenu.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.menusGetStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getAllMenu.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menusGetStatus = RequestStatus.Success;
          state.menus = action.payload;
          state.progress = endLoader();
        }
      })
      .addCase(getAllMenu.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menusGetStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload;
        }
      });

    //  get single menu
    builder
      .addCase(getMenuById.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.menuGetStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(getMenuById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menuGetStatus = RequestStatus.Success;
          state.menu = action.payload;
          state.editMenu = action.payload;
          state.progress = endLoader();
        }
      })
      .addCase(getMenuById.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menuGetStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload;
        }
      });

    // create new menu
    builder
      .addCase(createMenu.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.menuCreateStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menuCreateStatus = RequestStatus.Success;
          state.progress = endLoader();
        }
      })
      .addCase(createMenu.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menuCreateStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload;
        }
      });

    // edit menu
    builder
      .addCase(editMenu.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.menuPatchStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(editMenu.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menuPatchStatus = RequestStatus.Success;
          state.menu = action.payload;
          state.progress = endLoader();
        }
      })
      .addCase(editMenu.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menuPatchStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload;
        }
      });

    //  delete menu
    builder
      .addCase(deleteMenu.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
          state.menuDeleteStatus = RequestStatus.Getting;
          state.progress = startLoader();
        }
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menuDeleteStatus = RequestStatus.Success;
          state.progress = endLoader();
        }
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle';
          state.currentRequestId = action.meta.requestId;
          state.menuDeleteStatus = RequestStatus.Error;
          state.progress = endLoader();
          state.error = action.payload;
        }
      });
  }
});

export default menuSlice.reducer;
