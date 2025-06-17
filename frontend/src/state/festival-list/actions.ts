import { createAction } from '@reduxjs/toolkit';
import { Festival } from 'api/models';
import { ApiError } from 'state/common';

export const actionFetchFestivalList = createAction('festival/list/fetch');
export const actionLoadFestivalList =
  createAction<Festival[]>('festival/list/load');
export const actionLoadFestivalListFailed = createAction<ApiError>(
  'festival/list/load/failed'
);
