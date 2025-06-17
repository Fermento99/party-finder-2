import { createReducer } from '@reduxjs/toolkit';
import { FestivalDetails } from 'api/models';
import {
  actionFestivalDetailsFailed,
  actionFetchFestivalDetails,
  actionFollowFestival,
  actionFollowFestivalFailed,
  actionLoadFestivalDetails,
  actionUnfollowFestival,
  actionUnfollowFestivalFailed,
  actionUnvote,
  actionUnvoteFailed,
  actionVote,
  actionVoteFailed,
} from './actions';
import { LoadingStatus } from 'state/common';
import {
  addFollowToState,
  addVoteToState,
  removeFollowFromState,
  removeVoteFromState,
} from './utils';

export interface FestivalState {
  loadingStatus: LoadingStatus;
  details: FestivalDetails | null;
}

const initialFestivalState: FestivalState = {
  details: null,
  loadingStatus: 'initial',
};

export const festivalDetailsReducer = createReducer(
  initialFestivalState,
  (builder) => {
    builder
      .addCase(actionFetchFestivalDetails, (state) => {
        state.loadingStatus = 'pending';
      })
      .addCase(actionLoadFestivalDetails, (state, { payload }) => {
        state.loadingStatus = 'successful';
        state.details = payload;
      })
      .addCase(actionFestivalDetailsFailed, (state) => {
        state.loadingStatus = 'failed';
      })
      .addCase(actionVote, (state, { payload }) => {
        addVoteToState(state, payload);
      })
      .addCase(actionVoteFailed, (state, { payload }) => {
        removeVoteFromState(state, payload);
      })
      .addCase(actionUnvote, (state, { payload }) => {
        removeVoteFromState(state, payload);
      })
      .addCase(actionUnvoteFailed, (state, { payload }) => {
        addVoteToState(state, payload);
      })
      .addCase(actionFollowFestival, (state, { payload }) => {
        addFollowToState(state, payload);
      })
      .addCase(actionFollowFestivalFailed, (state, { payload }) => {
        removeFollowFromState(state, payload);
      })
      .addCase(actionUnfollowFestival, (state, { payload }) => {
        removeFollowFromState(state, payload);
      })
      .addCase(actionUnfollowFestivalFailed, (state, { payload }) => {
        addFollowToState(state, payload);
      });
  }
);
