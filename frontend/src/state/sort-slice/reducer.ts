import { createReducer } from '@reduxjs/toolkit';
import { BandSort } from 'utils/sorting/band-sorting';
import {
  actionCycleSort,
  actionAddSort,
  actionRemoveSort,
  actionApplyFilterSearch,
  actionApplyFilterFolowers,
  actionApplyFilterUserVotes,
  actionClearFilterSearch,
  actionClearFilterFolowers,
  actionClearFilterUserVotes,
} from './actions';
import { BandFilter } from 'utils/sorting/band-filtering';

export interface SortState {
  bandSort: BandSort[];
  bandFilter: BandFilter;
}

const initialSortState: SortState = {
  bandSort: [{ key: 'Followers', value: 'Desc' }],
  bandFilter: { search: '', followers: [0, Infinity], userVotes: [] },
};

export const sortReducer = createReducer(initialSortState, (builder) => {
  builder
    .addCase(actionAddSort, (state, { payload }) => {
      state.bandSort.push({ key: payload, value: 'Desc' });
    })
    .addCase(actionCycleSort, (state, { payload }) => {
      state.bandSort = state.bandSort.map((entry) => {
        if (entry.key === payload) {
          if (entry.value === 'Asc') {
            return { key: payload, value: 'Desc' };
          } else {
            return { key: payload, value: 'Asc' };
          }
        }

        return entry;
      });
    })
    .addCase(actionRemoveSort, (state, { payload }) => {
      state.bandSort = state.bandSort.filter(({ key }) => key !== payload);
    })
    .addCase(actionApplyFilterSearch, (state, { payload }) => {
      state.bandFilter.search = payload;
    })
    .addCase(actionApplyFilterFolowers, (state, { payload }) => {
      state.bandFilter.followers = payload;
    })
    .addCase(actionApplyFilterUserVotes, (state, { payload }) => {
      state.bandFilter.userVotes = payload;
    })
    .addCase(actionClearFilterSearch, (state) => {
      state.bandFilter.search = initialSortState.bandFilter.search;
    })
    .addCase(actionClearFilterFolowers, (state) => {
      state.bandFilter.followers = initialSortState.bandFilter.followers;
    })
    .addCase(actionClearFilterUserVotes, (state) => {
      state.bandFilter.userVotes = initialSortState.bandFilter.userVotes;
    });
});
