import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'state/store';

const selectFestivalState = (state: StoreState) => state.fetsivalDetails;

export const selectFestivalDetails = createSelector(
  selectFestivalState,
  (state) => state.details
);

export const selectFestivalDetailsLoadingStatus = createSelector(
  selectFestivalState,
  (state) => state.loadingStatus
);

export const selectBandVotes = (band_id: string) =>
  createSelector(
    selectFestivalDetails,
    (festivalDetails) =>
      festivalDetails?.bands.find(({ spotify_id }) => spotify_id === band_id)
        ?.votes
  );

export const selectUsersBandVote = (band_id: string, user_id: string) =>
  createSelector(
    selectBandVotes(band_id),
    (votes) => votes?.filter((vote) => vote.user_id === user_id)[0]?.vote
  );

export const selectUserFollowStatus = (user_id: string) =>
  createSelector(selectFestivalDetails, (state) =>
    state?.users.find((entry) => entry.user_id === user_id)
  );

export const selectRelevantUsers = createSelector(
  selectFestivalDetails,
  (state) => state?.users.map(({ user_id }) => user_id)
);
