import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/// Axios
import axios from 'axios';

/// User components
import { clearErrors, setErrors } from '../UI/uiSlice';

///////////////// THUNKS /////////////////

/// Login Thunk
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ userData, history }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post('/login', userData);
      console.log(res.data, 'in TRY');
      setAuthorizationHeader(res.data.token);
      dispatch(fetchUserData());
      dispatch(clearErrors());
      history.push('/dashboard');
      return null;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(setErrors(error.response.data));
      return rejectWithValue(error.response);
    }
  }
);

/// Signup Thunk
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async ({ newUserData, history }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post('/signup', newUserData);
      console.log(res.data, 'in TRY');
      setAuthorizationHeader(res.data.token);
      dispatch(fetchUserData());
      dispatch(clearErrors());
      history.push('/dashboard');
      return null;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(setErrors(error.response.data));
      return rejectWithValue(error.response);
    }
  }
);

/// Logout
export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch(setUnAuthenticated());
};

/// Fetch User Data Thunk
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  (payload, { dispatch }) => {
    console.log('in Fetch');
    dispatch(setAuthenticated());
    return axios.get('/user');
  }
);

/////////// END THUNKS ///////////

/// UserSlice

const initialState = {
  loading: 'idle',
  authenticated: false,
  credentials: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAuthenticated: state => {
      state.authenticated = true;
    },
    setUnAuthenticated: state => initialState,
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [loginUser.fulfilled]: state => {
      state.loading = 'idle';
      // console.log(action);
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = 'idle';
    },
    [fetchUserData.fulfilled]: (state, action) => {
      console.log(action);
      state.credentials = action.payload.data;
    },
  },
});

/// Selectors
export const selectLoading = state => state.user.loading;

export const { setUnAuthenticated, setAuthenticated } = userSlice.actions;

export default userSlice.reducer;

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
