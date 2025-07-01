import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'state/store';
import { BandSort } from 'utils/sorting/band-sorting';

const selectSortState = (state: StoreState) => state.sort;

export const selectBandSort = createSelector(
  selectSortState,
  (state): BandSort => state.bandSort
);
