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
};

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

const sortBandsByFollowers = (a: Band, b: Band, modifier: number) =>
  (a.details.followers - b.details.followers) * modifier;

const sortBandsByAvgVote = (a: Band, b: Band, modifier: number) =>
  (avgVote(b.votes) - avgVote(a.votes)) * modifier;

const sortBandsByVoteCount = (a: Band, b: Band, modifier: number) =>
  (a.votes.length - b.votes.length) * modifier;

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

export const sortBands = (bands: Band[], sorts: BandSort[]) => {
  const compositeSort = sorts.reduce(
    (composite, sort) => (a: Band, b: Band) =>
      composite(a, b) !== 0
        ? composite(a, b)
        : getSortComparator(sort.key)(a, b, sort.value === 'Desc' ? -1 : 1),
    (_: Band, __: Band) => 0
  );

  return bands.sort(compositeSort);
};
