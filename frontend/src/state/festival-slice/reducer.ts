import { createReducer } from '@reduxjs/toolkit';
import { Festival, FestivalDetails } from 'api/models';
import {
  actionErrorFestivalDetails,
  actionFetchFestivalDetails,
  actionFetchFestivalList,
  actionLoadFestivalDetails,
  actionLoadFestivalList,
} from './actions';
import { LoadingStatus } from 'state/common';

export interface FestivalState {
  festivalList: Festival[];
  loadingList: LoadingStatus;
  festivalDetails: FestivalDetails | null;
  loadingDetails: LoadingStatus;
}

const initialFestivalState: FestivalState = {
  festivalList: [],
  loadingList: 'idle',
  festivalDetails: null,
  loadingDetails: 'idle',
};

export const festivalReducer = createReducer(
  initialFestivalState,
  (builder) => {
    builder
      .addCase(actionFetchFestivalList, (state) => {
        state.loadingList = 'pending';
      })
      .addCase(actionLoadFestivalList, (state, { payload }) => {
        state.loadingList = 'successful';
        state.festivalList = payload;
      })
      .addCase(actionFetchFestivalDetails, (state) => {
        state.loadingDetails = 'pending';
      })
      .addCase(actionLoadFestivalDetails, (state, { payload }) => {
        state.loadingDetails = 'successful';
        state.festivalDetails = payload;
      })
      .addCase(actionErrorFestivalDetails, (state) => {
        state.loadingDetails = 'failed';
      });
  }
);
