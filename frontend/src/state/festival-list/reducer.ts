import { createReducer } from '@reduxjs/toolkit';
import { Festival } from 'api/models';
import { actionFetchFestivalList, actionLoadFestivalList } from './actions';
import { LoadingStatus } from 'state/common';

export interface FestivalListState {
  list: Festival[];
  loadingStatus: LoadingStatus;
}

const initialFestivalListState: FestivalListState = {
  list: [],
  loadingStatus: 'initial',
};

export const festivalListReducer = createReducer(
  initialFestivalListState,
  (builder) => {
    builder
      .addCase(actionFetchFestivalList, (state) => {
        state.loadingStatus = 'pending';
      })
      .addCase(actionLoadFestivalList, (state, { payload }) => {
        state.loadingStatus = 'successful';
        state.list = payload;
      });
  }
);
