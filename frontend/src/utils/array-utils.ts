import { UserEntry, Vote } from 'api/models';

const STATUS_ORDER = ['G', 'C'];

export const filterPositiveVotes = (vote: Vote) => vote.vote !== '5';

export const sortVotes = (a: Vote, b: Vote) => a.vote.localeCompare(b.vote);

export const sortUsersByStatus = (a: UserEntry, b: UserEntry) =>
  STATUS_ORDER.indexOf(a.user_status) - STATUS_ORDER.indexOf(b.user_status);
