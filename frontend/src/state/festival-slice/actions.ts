import { createAction } from '@reduxjs/toolkit';
import { Festival, FestivalDetails, VoteValue } from 'api/models';

export const actionFetchFestivalList = createAction('festival/list/fetch');
export const actionLoadFestivalList =
  createAction<Festival[]>('festival/list/load');
export const actionFetchFestivalDetails = createAction<string>(
  'festival/details/fetch'
);
export const actionLoadFestivalDetails = createAction<FestivalDetails>(
  'festival/details/load'
);

export const actionErrorFestivalDetails = createAction<Error>(
  'festival/details/error'
);

export const actionVote = createAction<{ band_id: string; vote: VoteValue }>(
  'festival/details/vote'
);
