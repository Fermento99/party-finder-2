import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  actionFetchFestivalList,
  actionLoadFestivalList,
  actionLoadFestivalListFailed,
} from './actions';
import { getFestivals } from 'api/festival';
import { handleApiCall } from 'state/common';

export const festivalListMiddleware = createListenerMiddleware();

festivalListMiddleware.startListening({
  actionCreator: actionFetchFestivalList,
  effect: async (_, listenerApi) => {
    handleApiCall({
      apiHandler: () => getFestivals(),
      successAction: (data) =>
        listenerApi.dispatch(actionLoadFestivalList(data)),
      failAction: (error) =>
        listenerApi.dispatch(actionLoadFestivalListFailed(error)),
      dispatch: listenerApi.dispatch,
    });
  },
});
