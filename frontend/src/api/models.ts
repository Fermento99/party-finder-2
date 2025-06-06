export const VOTES_MAP = {
  '1': 'absolutely need to see',
  '2': 'want to see',
  '3': 'could be interesting if works out',
  '4': 'on radar',
  '5': 'not interested',
};

export const USER_STATUSES_MAP = {
  C: 'Considering',
  G: 'Going',
};

export type VoteValue = keyof typeof VOTES_MAP;
export type UserStatusValue = keyof typeof USER_STATUSES_MAP;

export interface Festival {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  place: string;
  users: UserEntry[];
}

export type FestivalDetails = Festival & { bands: Band[] };

export interface UserEntry {
  festival_id: number;
  user_id: string;
  user_nickname: string;
  user_status: UserStatusValue;
  user_status_display: string;
}

export interface User {
  nickname: string;
  spotify_id: string;
  details: UserDetails;
}

export interface UserDetails {
  display_name: string;
  url: string;
  images: Image[];
}

export interface Band {
  spotify_id: string;
  details: BandDetails;
  votes: Vote[];
}

export interface BandDetails {
  name: string;
  followers: number;
  genres: string;
  images: Image[];
  url: string;
}

export interface Vote {
  band_id: string;
  user_id: string;
  user_nickname: string;
  vote: VoteValue;
  vote_display: string;
}

export interface Image {
  height: number;
  width: number;
  url: string;
}
