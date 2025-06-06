import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  actionFetchCurrentUser,
  actionFetchUserList,
  actionLoadCurrentUser,
  actionLoadUserList,
  actionUserDidLogout,
  actionUserLogout,
} from './actions';
import { getCurrentUserDetails, getUsers } from 'api/user';
import { logout } from 'api/auth';

export const userMiddleware = createListenerMiddleware();

userMiddleware.startListening({
  actionCreator: actionFetchUserList,
  effect: async (_, listenerApi) => {
    const usersList = await getUsers();
    listenerApi.dispatch(actionLoadUserList(usersList));
  },
});

userMiddleware.startListening({
  actionCreator: actionFetchCurrentUser,
  effect: async (_, listenerApi) => {
    const currentUserData = await getCurrentUserDetails();
    listenerApi.dispatch(actionLoadCurrentUser(currentUserData));
  },
});

userMiddleware.startListening({
  actionCreator: actionUserLogout,
  effect: async (_, listenerApi) => {
    await logout();
    listenerApi.dispatch(actionUserDidLogout());
  },
});
