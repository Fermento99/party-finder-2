import { createReducer } from '@reduxjs/toolkit';
import { Festival, FestivalDetails, VOTES_MAP } from 'api/models';
import {
  actionErrorFestivalDetails,
  actionFetchFestivalDetails,
  actionFetchFestivalList,
  actionLoadFestivalDetails,
  actionLoadFestivalList,
  actionUnvote,
  actionUnvoteFailed,
  actionVote,
  actionVoteFailed,
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
      })
      .addCase(actionVote, (state, { payload }) => {
        if (state.loadingDetails === 'successful') {
          const band = state.festivalDetails?.bands.find(
            ({ spotify_id }) => spotify_id === payload.band_id
          );
          if (band !== undefined) {
            band.votes = band.votes.filter(
              ({ user_id }) => user_id !== payload.user_id
            );
            band.votes.push({
              band_id: payload.band_id,
              user_id: payload.user_id,
              user_nickname: payload.user_nickname,
              vote: payload.vote,
              vote_display: VOTES_MAP[payload.vote],
            });
          }
        }
      })
      .addCase(actionVoteFailed, (state, { payload }) => {
        const band = state.festivalDetails?.bands.find(
          ({ spotify_id }) => spotify_id === payload.band_id
        );
        if (band !== undefined) {
          band.votes = band.votes.filter(
            ({ user_id }) => user_id !== payload.user_id
          );
        }
      })
      .addCase(actionUnvote, (state, { payload }) => {
        const band = state.festivalDetails?.bands.find(
          ({ spotify_id }) => spotify_id === payload.band_id
        );
        if (band !== undefined) {
          band.votes = band.votes.filter(
            ({ user_id }) => user_id !== payload.user_id
          );
        }
      })
      .addCase(actionUnvoteFailed, (state, { payload }) => {
        if (state.loadingDetails === 'successful') {
          const band = state.festivalDetails?.bands.find(
            ({ spotify_id }) => spotify_id === payload.band_id
          );
          if (band !== undefined) {
            band.votes.push({
              band_id: payload.band_id,
              user_id: payload.user_id,
              user_nickname: payload.user_nickname,
              vote: payload.vote,
              vote_display: VOTES_MAP[payload.vote],
            });
          }
        }
      });
  }
);
