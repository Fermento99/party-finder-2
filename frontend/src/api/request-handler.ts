import { ApiError } from 'state/common';

const API_PREFIX = process.env['REACT_APP_API_URL'];

type Method = 'POST' | 'GET' | 'DELETE';

interface RequestHandlerParams {
  url: string;
  method: Method;
  data?: object;
}

const postHandler = async (url: string, data: object) => {
  return requestHandler({ url, data, method: 'POST' });
};

const getHandler = async (url: string) => {
  return requestHandler({ url, method: 'GET' });
};

const deleteHandler = async (url: string) => {
  return requestHandler({ url, method: 'DELETE' });
};

const requestHandler = async ({ url, method, data }: RequestHandlerParams) => {
  const response = await fetch(`${API_PREFIX}/${url}`, {
    body: method === 'POST' ? JSON.stringify(data) : undefined,
    method,
  });

  if (!response.ok) throw new ApiError(response.statusText, response.status);

  return await response.json();
};

export { postHandler, getHandler, deleteHandler };
