import { createReducer } from '@reduxjs/toolkit';
import { BandSort } from 'utils/sorting/band-sorting';
import { actionChangeSort } from './actions';

export interface SortState {
  bandSort: BandSort;
}

const initialSortState: SortState = {
  bandSort: [],
};

export const sortReducer = createReducer(initialSortState, (builder) => {
  builder.addCase(actionChangeSort, (state, { payload }) => {
    state.bandSort = payload;
  });
});
