import { Band } from 'api/models';

export type RangeFilterValue = [number, number];

type BandFilterValue = string | RangeFilterValue | string[];

export const BAND_FILTER_KEY_NAME_MAP = {
  search: 'Search',
  followers: 'Followers',
  userVotes: 'User Votes',
} as Record<BandFilterKeyType, string>;

export type BandFilter = {
  search: string;
  followers: RangeFilterValue;
  userVotes: string[];
};

export type BandFilterKeyType = keyof BandFilter;

const filterUsersVotes = (band: Band, values: BandFilterValue) =>
  !!band.votes.find((vote) => (values as string[]).includes(vote.user_id));

const filterFollowerRange = (band: Band, range: BandFilterValue) =>
  band.details.followers >= (range as RangeFilterValue)[0] &&
  band.details.followers <= (range as RangeFilterValue)[1];

const filterSearch = (band: Band, value: BandFilterValue) =>
  !!band.details.name
    .toLocaleLowerCase()
    .match((value as string).toLocaleLowerCase());

const getFilter = (key: BandFilterKeyType) => {
  switch (key) {
    case 'userVotes':
      return filterUsersVotes;
    case 'followers':
      return filterFollowerRange;
    case 'search':
      return filterSearch;
  }
};

export const emptyValueChecker = (
  key: BandFilterKeyType,
  value: BandFilterValue
) => {
  switch (key) {
    case 'userVotes':
      return value.length !== 0;
    case 'followers':
      return value[0] !== 0 && value[1] !== Infinity;
    default:
      return !!value;
  }
};

export const filterBands = (bands: Band[], filters: BandFilter) => {
  const compositeFilter = Object.entries(filters).reduce(
    (composite, [key, value]) =>
      (band: Band) =>
        composite(band) &&
        (emptyValueChecker(key as BandFilterKeyType, value)
          ? getFilter(key as BandFilterKeyType)(band, value)
          : true),
    (_: Band) => true
  );

  return bands.filter(compositeFilter);
};

export const countActiveFilters = (filters: BandFilter) =>
  Object.entries(filters).reduce(
    (acc, [key, value]) =>
      acc + (emptyValueChecker(key as BandFilterKeyType, value) ? 1 : 0),
    0
  );
