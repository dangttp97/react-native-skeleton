import { CONSTANTS } from '@constants';

function objToQueryString(obj: { [key: string]: any }) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.join('&');
}

type FetchParams<T> = {
  baseUrl: string;
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  urlParams?: T;
  headers?: object;
  body?: T;
};

export const useFetch = () => {
  const handleError: { [key: number]: any } = {
    [200]: undefined,
    [401]: () => {
      throw Error('Authorization not correct');
    },
    [500]: () => {
      throw Error('Server error, try again later');
    },
  };

  const request = async <T>({ ...params }: FetchParams<T>) => {
    try {
      const url = params.baseUrl.concat(params.path);

      if (params.urlParams) {
        url.concat(objToQueryString(params.urlParams));
      }

      const response = await fetch(url, {
        method: params.method.toUpperCase(),
        headers: params.headers
          ? {
              ...params.headers,
              Authorization: `Client-ID ${CONSTANTS.apiToken}`,
            }
          : {
              Authorization: `Client-ID ${CONSTANTS.apiToken}`,
            },
        body: params.body ? JSON.stringify(params.body) : undefined,
      });

      const resJson = await response.json();

      if (response.ok) {
        return resJson;
      }

      handleError[response.status] && handleError[response.status]();
    } catch (err: any) {
      console.error('Network error:', err.message);
    }
  };

  return {
    request,
  };
};
