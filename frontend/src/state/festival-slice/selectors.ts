import { createSelector } from '@reduxjs/toolkit';
import { Festival, FestivalDetails } from 'api/models';
import { DataSelector } from 'state/common';
import { StoreState } from 'state/store';

const selectFestivalState = (state: StoreState) => state.festival;

export const festivalListDataSelector = createSelector(
  selectFestivalState,
  (state): DataSelector<Festival[]> => {
    if (state.loadingList === 'successful')
      return {
        data: state.festivalList,
        loading: state.loadingList,
        error: null,
      };
    if (state.loadingList === 'failed')
      return {
        data: null,
        loading: state.loadingList,
        error: { message: 'error' },
      };

    return { data: null, loading: state.loadingList, error: null };
  }
);

export const festivalDetailsDataSelector = createSelector(
  selectFestivalState,
  (state): DataSelector<FestivalDetails> => {
    if (state.loadingDetails === 'successful')
      return {
        data: state.festivalDetails!,
        loading: state.loadingDetails,
        error: null,
      };
    if (state.loadingDetails === 'failed')
      return {
        data: null,
        loading: state.loadingDetails,
        error: { message: 'error' },
      };

    return { data: null, loading: state.loadingDetails, error: null };
  }
);

export const selectBandVotes = (band_id: string) =>
  createSelector(
    festivalDetailsDataSelector,
    (state) =>
      state.data?.bands.find(({ spotify_id }) => spotify_id === band_id)?.votes
  );

export const selectUsersBandVote = (band_id: string, user_id: string) =>
  createSelector(
    selectBandVotes(band_id),
    (state) => state?.filter((vote) => vote.user_id === user_id)[0]?.vote
  );
