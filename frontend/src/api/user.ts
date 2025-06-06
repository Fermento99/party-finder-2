import { User } from './models';
import { getHandler } from './request-handler';

const getCurrentUserDetails = async (): Promise<User> => {
  return getHandler('user/');
};

const getUsers = async (): Promise<User[]> => {
  return getHandler('users/');
};

const getUserDetails = async (id: string): Promise<User> => {
  return getHandler(`users/${id}/`);
};

export { getCurrentUserDetails, getUsers, getUserDetails };
