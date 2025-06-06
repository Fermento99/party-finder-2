import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { festivalReducer } from './festival-slice/reducer';
import { festivalMiddleware } from './festival-slice/middleware';
import { userReducer } from './user-slice/reducer';
import { userMiddleware } from './user-slice/middleware';

const rootReducer = combineReducers({
  festival: festivalReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(festivalMiddleware.middleware)
      .concat(userMiddleware.middleware),
});

export type StoreState = ReturnType<typeof rootReducer>;
