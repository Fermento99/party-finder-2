import { createReducer } from '@reduxjs/toolkit';
import { User } from 'api/models';
import { LoadingStatus } from 'state/common';
import {
  actionFetchUserList,
  actionLoadCurrentUser,
  actionLoadUserList,
  actionFetchCurrentUser,
  actionUserLogout,
  actionUserDidLogout,
} from './actions';

interface UserState {
  users: User[];
  loading: LoadingStatus;
  loggedUser: User | null;
  isUserLoggingIn: LoadingStatus;
}

const initialUserState: UserState = {
  users: [],
  loading: 'idle',
  loggedUser: null,
  isUserLoggingIn: 'idle',
};

export const userReducer = createReducer(initialUserState, (builder) =>
  builder
    .addCase(actionFetchUserList, (state) => {
      state.loading = 'pending';
    })
    .addCase(actionLoadUserList, (state, { payload }) => {
      state.loading = 'successful';
      state.users = payload;
    })
    .addCase(actionFetchCurrentUser, (state) => {
      state.isUserLoggingIn = 'pending';
    })
    .addCase(actionLoadCurrentUser, (state, { payload }) => {
      state.isUserLoggingIn = 'successful';
      state.loggedUser = payload;
    })
    .addCase(actionUserLogout, (state) => {
      state.isUserLoggingIn = 'pending';
      state.loggedUser = null;
    })
    .addCase(actionUserDidLogout, (state) => {
      state.isUserLoggingIn = 'failed';
    })
);
