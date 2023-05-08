import { CONSTANTS } from '@constants';
import { useEffect, useState } from 'react';
import * as useReactFetch from 'react-fetch-hook';
import createTrigger from 'react-use-trigger';
import useTrigger from 'react-use-trigger/useTrigger';

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

const trigger = createTrigger();

export const useFetch = <T>({ ...params }: FetchParams<T>) => {
  const [refreshing, setRefreshing] = useState(false);
  const url = params.baseUrl.concat(params.path);
  const triggerValue = useTrigger(trigger);
  const responseParams = useReactFetch.default<T>(url, {
    headers: params.headers
      ? {
          ...params.headers,
          Authorization: `Client-ID ${CONSTANTS.apiToken}`,
        }
      : {
          Authorization: `Client-ID ${CONSTANTS.apiToken}`,
        },
    body: params.body ? JSON.stringify(params.body) : undefined,
    depends: [triggerValue],
  });

  useEffect(() => {
    if (responseParams.data && refreshing) {
      setRefreshing(false);
    }
  }, [refreshing, responseParams.data]);

  if (params.urlParams) {
    url.concat(objToQueryString(params.urlParams));
  }

  const refetch = () => {
    setRefreshing(true);
    trigger();
  };

  return {
    ...responseParams,
    isRefreshing: refreshing,
    refetch,
  };
  // const request = async <T>({
  //   ...params
  // }: FetchParams<T>): Promise<Response<T>> => {
  //   const { data, error, isLoading } = useReactFetch.default({

  //   })

  //   let returnResult: Response<T> = { isLoading: true };

  //   try {
  //     const url = params.baseUrl.concat(params.path);

  //     if (params.urlParams) {
  //       url.concat(objToQueryString(params.urlParams));
  //     }

  //     const response = await fetch(url, {
  //       method: params.method.toUpperCase(),
  // headers: params.headers
  //   ? {
  //       ...params.headers,
  //       Authorization: `Client-ID ${CONSTANTS.apiToken}`,
  //     }
  //   : {
  //       Authorization: `Client-ID ${CONSTANTS.apiToken}`,
  //     },
  //       body: params.body ? JSON.stringify(params.body) : undefined,
  //     });

  //     const resJson = await response.json();

  //     if (response.ok) {
  //       returnResult = { isLoading: false, data: resJson };
  //       return returnResult;
  //     }

  //     ERROR_HANDLER[response.status] && ERROR_HANDLER[response.status]();
  //   } catch (err: any) {
  //     returnResult = { isLoading: false, error: err };
  //     return returnResult;
  //   }

  //   return returnResult;
  // };

  // return {
  //   request,
  // };
};
