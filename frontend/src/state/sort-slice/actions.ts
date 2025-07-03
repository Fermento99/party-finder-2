import { createAction } from '@reduxjs/toolkit';
import { RangeFilterValue } from 'utils/sorting/band-filtering';
import { BandSortKeyType } from 'utils/sorting/band-sorting';

export const actionAddSort =
  createAction<BandSortKeyType>('sort/band/sort/add');
export const actionCycleSort = createAction<BandSortKeyType>(
  'sort/band/sort/cycle'
);
export const actionRemoveSort = createAction<BandSortKeyType>(
  'sort/band/sort/remove'
);
export const actionApplyFilterSearch = createAction<string>(
  'sort/band/filter/search/apply'
);
export const actionApplyFilterFolowers = createAction<RangeFilterValue>(
  'sort/band/filter/followers/apply'
);
export const actionApplyFilterUserVotes = createAction<string[]>(
  'sort/band/filter/uservotes/apply'
);
export const actionClearFilterSearch = createAction(
  'sort/band/filter/search/clear'
);
export const actionClearFilterFolowers = createAction(
  'sort/band/filter/followers/clear'
);
export const actionClearFilterUserVotes = createAction(
  'sort/band/filter/uservotes/clear'
);
