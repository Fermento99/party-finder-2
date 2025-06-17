import { createSelector } from '@reduxjs/toolkit';
import { Festival } from 'api/models';
import { StoreState } from 'state/store';

const selectFestivalState = (state: StoreState) => state.festivalList;

export const selectFestivalList = createSelector(
  selectFestivalState,
  (state): Festival[] => state.list
);

export const selectFestivalListLoadingStatus = createSelector(
  selectFestivalState,
  (state) => state.loadingStatus
);
