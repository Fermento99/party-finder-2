const API_PREFIX = process.env['REACT_APP_API_URL'];

type Method = 'POST' | 'GET';

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

const requestHandler = async ({ url, method, data }: RequestHandlerParams) => {
  const response = await fetch(`${API_PREFIX}/${url}`, {
    body: method === 'GET' ? undefined : JSON.stringify(data),
    method,
  });

  return await response.json();
};

export { postHandler, getHandler };
