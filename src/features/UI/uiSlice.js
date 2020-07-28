import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errors: {},
};

/// Driver
const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setErrors: (state, action) => {
      state.loading = 'idle';
      state.errors = action.payload;
    },
    clearErrors: state => {
      state.loading = 'idle';
      state.errors = {};
    },
    uiLoading: state => (state.loading = 'pending'),
  },
});

/// Selectors
export const selectErrors = state => state.ui.errors;

export const { setErrors, clearErrors } = uiSlice.actions;

export default uiSlice.reducer;
