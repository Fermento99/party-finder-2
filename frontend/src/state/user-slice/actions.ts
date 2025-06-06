import { createAction } from '@reduxjs/toolkit';
import { User } from 'api/models';

export const actionFetchUserList = createAction('user/list/fetch');
export const actionLoadUserList = createAction<User[]>('user/list/load');
export const actionFetchCurrentUser = createAction('user/current/fetch');
export const actionLoadCurrentUser = createAction<User>('user/current/load');
export const actionUserLogout = createAction('user/current/logout');
export const actionUserDidLogout = createAction('user/current/did-logout');
