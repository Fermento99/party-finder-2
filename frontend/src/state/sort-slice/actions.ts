import { createAction } from '@reduxjs/toolkit';
import { BandSort } from 'utils/sorting/band-sorting';

export const actionChangeSort = createAction<BandSort>('sort/band/change');
