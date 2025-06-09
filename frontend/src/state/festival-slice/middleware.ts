import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  actionErrorFestivalDetails,
  actionFetchFestivalDetails,
  actionFetchFestivalList,
  actionLoadFestivalDetails,
  actionLoadFestivalList,
  actionUnvote,
  actionUnvoteFailed,
  actionVote,
  actionVoteFailed,
} from './actions';
import { getFestivalDetails, getFestivals } from 'api/festival';
import { unvoteOnBand, voteOnBand } from 'api/band';

export const festivalMiddleware = createListenerMiddleware();

festivalMiddleware.startListening({
  actionCreator: actionFetchFestivalList,
  effect: async (_, listenerApi) => {
    const festivalsList = await getFestivals();
    listenerApi.dispatch(actionLoadFestivalList(festivalsList));
  },
});

festivalMiddleware.startListening({
  actionCreator: actionFetchFestivalDetails,
  effect: async ({ payload }, listenerApi) => {
    try {
      const festivalsDetails = await getFestivalDetails(payload);

      listenerApi.dispatch(actionLoadFestivalDetails(festivalsDetails));
    } catch (err) {
      listenerApi.dispatch(actionErrorFestivalDetails(err as Error));
    }
  },
});

festivalMiddleware.startListening({
  actionCreator: actionVote,
  effect: async ({ payload }, listenerApi) => {
    try {
      voteOnBand(payload.band_id, payload.vote);
    } catch (err) {
      listenerApi.dispatch(
        actionVoteFailed({
          user_id: payload.user_id,
          band_id: payload.band_id,
        })
      );
    }
  },
});

festivalMiddleware.startListening({
  actionCreator: actionUnvote,
  effect: async ({ payload }, listenerApi) => {
    try {
      unvoteOnBand(payload.band_id);
    } catch (err) {
      listenerApi.dispatch(actionUnvoteFailed(payload));
    }
  },
});
