import { createAction } from '@reduxjs/toolkit';
import { Festival, FestivalDetails, Vote } from 'api/models';

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

export const actionVote = createAction<Vote>('festival/details/vote');

export const actionVoteFailed = createAction<{
  user_id: string;
  band_id: string;
}>('festival/details/vote/failed');

export const actionUnvote = createAction<Vote>('festival/details/unvote');

export const actionUnvoteFailed = createAction<Vote>(
  'festival/details/unvote/failed'
);
