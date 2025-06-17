import { UserEntry, Vote } from 'api/models';
import { FestivalState } from './reducer';

export const addVoteToState = (state: FestivalState, payload: Vote) => {
  const band = state.details?.bands.find(
    ({ spotify_id }) => spotify_id === payload.band_id
  );
  if (band !== undefined) {
    band.votes = band.votes.filter(
      ({ user_id }) => user_id !== payload.user_id
    );
    band.votes.push(payload);
  }
};
export const removeVoteFromState = (
  state: FestivalState,
  payload: Pick<Vote, 'user_id' | 'band_id'>
) => {
  const band = state.details?.bands.find(
    ({ spotify_id }) => spotify_id === payload.band_id
  );
  if (band !== undefined) {
    band.votes = band.votes.filter(
      ({ user_id }) => user_id !== payload.user_id
    );
  }
};
export const addFollowToState = (state: FestivalState, payload: UserEntry) => {
  const usersPreviousVote = state.details?.users.find(
    ({ user_id }) => user_id === payload.user_id
  );
  if (usersPreviousVote !== undefined) {
    usersPreviousVote.user_status = payload.user_status;
    usersPreviousVote.user_status_display = payload.user_status_display;
  } else {
    state.details?.users.push(payload);
  }
};
export const removeFollowFromState = (
  state: FestivalState,
  payload: Pick<UserEntry, 'user_id'>
) => {
  if (state.details !== null) {
    state.details.users = state.details?.users.filter(
      ({ user_id }) => user_id !== payload.user_id
    );
  }
};
