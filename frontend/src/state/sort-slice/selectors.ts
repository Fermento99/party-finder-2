import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'state/store';
import { BandFilter } from 'utils/sorting/band-filtering';
import { BandSort } from 'utils/sorting/band-sorting';

const selectSortState = (state: StoreState) => state.sort;

export const selectBandSort = createSelector(
  selectSortState,
  (state): BandSort[] => state.bandSort
);

export const selectBandFilter = createSelector(
  selectSortState,
  (state): BandFilter => state.bandFilter
);

export const selectBandFilterSearch = createSelector(
  selectSortState,
  (state) => state.bandFilter.search
);

export const selectBandFilterFollowers = createSelector(
  selectSortState,
  (state) => state.bandFilter.followers
);

export const selectBandFilterUserVotes = createSelector(
  selectSortState,
  (state) => state.bandFilter.userVotes
);
