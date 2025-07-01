import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  actionFetchCurrentUser,
  actionFetchUserList,
  actionLoadCurrentUser,
  actionLoadCurrentUserFailed,
  actionLoadUserList,
  actionLoadUserListFailed,
  actionUserDidLogout,
  actionUserLogout,
} from './actions';
import { getCurrentUserDetails, getUsers } from 'api/user';
import { logout } from 'api/auth';
import { handleApiCall } from 'state/common';

export const userMiddleware = createListenerMiddleware();

userMiddleware.startListening({
  actionCreator: actionFetchUserList,
  effect: async (_, listenerApi) => {
    handleApiCall({
      apiHandler: () => getUsers(),
      successAction: (data) => listenerApi.dispatch(actionLoadUserList(data)),
      failAction: (error) =>
        listenerApi.dispatch(actionLoadUserListFailed(error)),
      dispatch: listenerApi.dispatch,
    });
  },
});

userMiddleware.startListening({
  actionCreator: actionFetchCurrentUser,
  effect: async (_, listenerApi) => {
    handleApiCall({
      apiHandler: () => getCurrentUserDetails(),
      successAction: (data) =>
        listenerApi.dispatch(actionLoadCurrentUser(data)),
      failAction: (error) =>
        listenerApi.dispatch(actionLoadCurrentUserFailed(error)),
      dispatch: listenerApi.dispatch,
    });
  },
});

userMiddleware.startListening({
  actionCreator: actionUserLogout,
  effect: async (_, listenerApi) => {
    await logout();
    listenerApi.dispatch(actionUserDidLogout());
  },
});
