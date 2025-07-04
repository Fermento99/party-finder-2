import { Festival, USER_STATUSES_MAP, UserEntry, Vote } from 'api/models';

const STATUS_ORDER = Object.keys(USER_STATUSES_MAP);

export const filterRelevantVotes = (userList?: string[]) => (vote: Vote) =>
  userList === undefined || userList.includes(vote.user_id);

export const sortVotes = (a: Vote, b: Vote) => a.vote.localeCompare(b.vote);

export const sortUsersByStatus = (a: UserEntry, b: UserEntry) =>
  STATUS_ORDER.indexOf(a.user_status) - STATUS_ORDER.indexOf(b.user_status);

export const sortFestivalsByStartDate = (a: Festival, b: Festival) =>
  new Date(a.start_date) < new Date(b.start_date) ? -1 : 1;
