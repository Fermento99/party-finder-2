import { createSelector } from '@reduxjs/toolkit';
import { User } from 'api/models';
import { StoreState } from 'state/store';

const selectUserState = (state: StoreState) => state.user;

export const selectUsersList = createSelector(
  selectUserState,
  (state): User[] => state.users
);

export const selectUserDetails = (id?: string) =>
  createSelector(selectUsersList, (users): User | null => {
    if (id) {
      return users.find(({ spotify_id }) => spotify_id === id) ?? null;
    }
    return null;
  });

export const selectCurrentUserDetails = createSelector(
  selectUserState,
  (state) => state.loggedUser
);

export const selectCurrentUserIdAndNickname = createSelector(
  selectCurrentUserDetails,
  (user) => ({
    nickname: user?.nickname,
    spotify_id: user?.spotify_id,
  })
);

export const selectCurrentUserLoadingStatus = createSelector(
  selectUserState,
  (state) => state.isUserLoggingIn
);
