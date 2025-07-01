import { Band, Vote } from 'api/models';

export const BAND_SORT_KEYS = [
  'Best Grade',
  'Popularity',
  'Followers',
] as const;
export const SORT_VALUES = ['Desc', 'Asc'] as const;

export type BandSortKeyType = (typeof BAND_SORT_KEYS)[number];
export type BandSortValue = (typeof SORT_VALUES)[number];

export type BandSort = {
  key: BandSortKeyType;
  value: BandSortValue;
}[];

const avgVote = (votes: Vote[]) => {
  if (votes.length === 0) return 6;
  const { sum, count } = votes.reduce(
    (acc, vote) => ({
      sum: acc.sum + parseInt(vote.vote),
      count: acc.count + 1,
    }),
    { sum: 0, count: 0 }
  );
  return sum / count;
};

const sortBandsByFollowers = (a: Band, b: Band) =>
  a.details.followers - b.details.followers;

const sortBandsByAvgVote = (a: Band, b: Band) =>
  avgVote(b.votes) - avgVote(a.votes);

const sortBandsByVoteCount = (a: Band, b: Band) =>
  a.votes.length - b.votes.length;

const getSortComparator = (key: BandSortKeyType) => {
  switch (key) {
    case 'Best Grade':
      return sortBandsByAvgVote;
    case 'Popularity':
      return sortBandsByVoteCount;
    case 'Followers':
      return sortBandsByFollowers;
  }
};

export const getBandSort = (key: BandSortKeyType, reverse: boolean) => {
  const comparator = getSortComparator(key);
  if (reverse) return (a: Band, b: Band) => comparator(b, a);
  return comparator;
};
