import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';

import userReducer from 'features/user/userSlice';

import uiReducer from 'features/UI/uiSlice';

import urlReducer from 'features/url/urlSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    ui: uiReducer,
    url: urlReducer,
  },
});
