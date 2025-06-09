import { createSelector } from '@reduxjs/toolkit';
import { User } from 'api/models';
import { DataSelector, DetailDataSelector } from 'state/common';
import { StoreState } from 'state/store';

const selectUserState = (state: StoreState) => state.user;

export const selectUsersDetails = createSelector(
  selectUserState,
  (state): DataSelector<User[]> => {
    if (state.loading === 'successful')
      return { data: state.users, loading: state.loading, error: null };
    if (state.loading === 'failed')
      return {
        data: null,
        loading: state.loading,
        error: { message: 'error' },
      };

    return { data: null, loading: state.loading, error: null };
  }
);

export const selectUserDetails = (id?: string) =>
  createSelector(selectUserState, (state): DetailDataSelector<User> => {
    if (!id)
      return {
        data: null,
        loading: 'idle',
        error: null,
      };
    if (state.loading === 'successful')
      return {
        data: state.users.find(({ spotify_id }) => spotify_id === id) ?? null,
        loading: state.loading,
        error: null,
      };
    if (state.loading === 'failed')
      return {
        data: null,
        loading: state.loading,
        error: { message: 'error' },
      };

    return { data: null, loading: state.loading, error: null };
  });

export const selectCurrentUserDetails = createSelector(
  selectUserState,
  (state): DetailDataSelector<User> => {
    if (state.isUserLoggingIn === 'successful')
      return {
        data: state.loggedUser,
        loading: state.isUserLoggingIn,
        error: null,
      };
    if (state.isUserLoggingIn === 'failed')
      return {
        data: null,
        loading: state.isUserLoggingIn,
        error: { message: 'error' },
      };

    return { data: null, loading: state.isUserLoggingIn, error: null };
  }
);

export const selectCurrentUserIdAndNickname = createSelector(
  selectCurrentUserDetails,
  ({ data }) => ({
    nickname: data!.nickname,
    spotify_id: data!.spotify_id,
  })
);
