import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user-slice/reducer';
import { userMiddleware } from './user-slice/middleware';
import { festivalListReducer } from './festival-list/reducer';
import { festivalDetailsReducer } from './festival-details/reducer';
import { festivalDatailsMiddleware } from './festival-details/middleware';
import { festivalListMiddleware } from './festival-list/middleware';

const rootReducer = combineReducers({
  festivalList: festivalListReducer,
  fetsivalDetails: festivalDetailsReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(festivalListMiddleware.middleware)
      .concat(festivalDatailsMiddleware.middleware)
      .concat(userMiddleware.middleware),
});

export type StoreState = ReturnType<typeof rootReducer>;
