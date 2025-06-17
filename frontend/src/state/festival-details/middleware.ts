import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  actionFestivalDetailsFailed,
  actionFetchFestivalDetails,
  actionFollowFestival,
  actionFollowFestivalFailed,
  actionLoadFestivalDetails,
  actionUnfollowFestival,
  actionUnfollowFestivalFailed,
  actionUnvote,
  actionUnvoteFailed,
  actionVote,
  actionVoteFailed,
} from './actions';
import {
  followFestival,
  getFestivalDetails,
  unFollowFestival,
} from 'api/festival';
import { unvoteOnBand, voteOnBand } from 'api/band';
import { handleApiCall } from 'state/common';

export const festivalDatailsMiddleware = createListenerMiddleware();

festivalDatailsMiddleware.startListening({
  actionCreator: actionFetchFestivalDetails,
  effect: async ({ payload }, listenerApi) => {
    handleApiCall({
      apiHandler: () => getFestivalDetails(payload),
      successAction: (data) =>
        listenerApi.dispatch(actionLoadFestivalDetails(data)),
      failAction: (error) =>
        listenerApi.dispatch(actionFestivalDetailsFailed(error)),
      dispatch: listenerApi.dispatch,
    });
  },
});

festivalDatailsMiddleware.startListening({
  actionCreator: actionVote,
  effect: async ({ payload }, listenerApi) => {
    handleApiCall({
      apiHandler: () => voteOnBand(payload.band_id, payload.vote),
      failAction: (error) =>
        listenerApi.dispatch(
          actionVoteFailed({
            user_id: payload.user_id,
            band_id: payload.band_id,
            ...error,
          })
        ),
      dispatch: listenerApi.dispatch,
    });
  },
});

festivalDatailsMiddleware.startListening({
  actionCreator: actionUnvote,
  effect: async ({ payload }, listenerApi) => {
    handleApiCall({
      apiHandler: () => unvoteOnBand(payload.band_id),
      failAction: (error) =>
        listenerApi.dispatch(actionUnvoteFailed({ ...payload, ...error })),
      dispatch: listenerApi.dispatch,
    });
  },
});

festivalDatailsMiddleware.startListening({
  actionCreator: actionFollowFestival,
  effect: async ({ payload }, listenerApi) => {
    handleApiCall({
      apiHandler: () =>
        followFestival(payload.festival_id, payload.user_status),
      failAction: (error) =>
        listenerApi.dispatch(
          actionFollowFestivalFailed({ ...payload, ...error })
        ),
      dispatch: listenerApi.dispatch,
    });
  },
});

festivalDatailsMiddleware.startListening({
  actionCreator: actionUnfollowFestival,
  effect: async ({ payload }, listenerApi) => {
    handleApiCall({
      apiHandler: () => unFollowFestival(payload.festival_id),
      failAction: (error) =>
        listenerApi.dispatch(
          actionUnfollowFestivalFailed({ ...payload, ...error })
        ),
      dispatch: listenerApi.dispatch,
    });
  },
});
