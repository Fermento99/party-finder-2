import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  actionErrorFestivalDetails,
  actionFetchFestivalDetails,
  actionFetchFestivalList,
  actionLoadFestivalDetails,
  actionLoadFestivalList,
} from './actions';
import { getFestivalDetails, getFestivals } from 'api/festival';

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
    } catch (error) {
      listenerApi.dispatch(actionErrorFestivalDetails(error as Error));
    }
  },
});
