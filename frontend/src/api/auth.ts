import { getHandler } from './request-handler';

const login = async () => {
  return getHandler('login/');
};

const logout = async () => {
  return getHandler('logout/');
};

export { login, logout };
