import { createAction } from '@reduxjs/toolkit';
import { FestivalDetails, UserEntry, Vote } from 'api/models';
import { ApiError } from 'state/common';

export const actionFetchFestivalDetails = createAction<string>(
  'festival/details/fetch'
);
export const actionLoadFestivalDetails = createAction<FestivalDetails>(
  'festival/details/load'
);

export const actionFestivalDetailsFailed = createAction<ApiError>(
  'festival/details/failed'
);

export const actionVote = createAction<Vote>('festival/details/vote');

export const actionVoteFailed = createAction<
  Pick<Vote, 'user_id' | 'band_id'> & ApiError
>('festival/details/vote/failed');

export const actionUnvote = createAction<Vote>('festival/details/unvote');

export const actionUnvoteFailed = createAction<Vote & ApiError>(
  'festival/details/unvote/failed'
);

export const actionFollowFestival = createAction<UserEntry>(
  'festival/details/follow'
);

export const actionFollowFestivalFailed = createAction<
  Pick<UserEntry, 'user_id'> & ApiError
>('festival/details/follow/failed');

export const actionUnfollowFestival = createAction<UserEntry>(
  'festival/details/unfollow'
);

export const actionUnfollowFestivalFailed = createAction<UserEntry & ApiError>(
  'festival/details/unfollow/failed'
);
