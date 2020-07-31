import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/// Axios
import axios from 'axios';

import { setErrors } from '../UI/uiSlice';

export const fetchUrls = createAsyncThunk(
  'url/fetchUrls',
  (payload, { dispatch }) => axios.get('/urls')
);

/// Url Slice
const urlSlice = createSlice({
  name: 'url',
  initialState: {
    error: '',
    loading: 'idle',
    urls: [],
  },
  reducers: {},
  extraReducers: {
    [fetchUrls.fulfilled]: (state, { payload }) => {
      state.urls = payload.data;
      state.loading = 'idle';
    },
    [fetchUrls.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = 'idle';
    },
    [fetchUrls.pending]: state => {
      state.loading = 'pending';
    },
  },
});

/// Selectors

// export const {} = urlSlice.actions

export default urlSlice.reducer;
