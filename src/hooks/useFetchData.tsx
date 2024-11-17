import {useState} from 'react';
import {BASE_URL, REQ_STATUS} from '@utils/constants';
import { objectToQueryParams } from '@utils/utils';

export interface IFetchData {
  loading?: boolean;
  data?: any;
  error?: any;
  message?: string | null;
  status?: string;
}

export interface IFetchOptions {
  urlPath?: string;
  header?: any;
  queryParams?: any;
  body?: any;
  option?: any;
}

const useFetchData = (config?: IFetchOptions) => {
  const [result, setResult] = useState<IFetchData>({
    loading: false,
    data: null,
    message: null,
    error: null,
    status: REQ_STATUS.INITIAL,
  });

  const fetchData = async (configOverride?: IFetchOptions) => {
    setResult(prevData => {
      return {
        ...prevData,
        data: null,
        loading: true,
        message: null,
        error: null,
        status: REQ_STATUS.LOADING,
      };
    });
    
    return fetchDataHooks({
      body: configOverride?.body || config?.body,
      urlPath: configOverride?.urlPath || config?.urlPath,
      header: configOverride?.header || config?.header,
      queryParams: configOverride?.queryParams || config?.queryParams,
      option: configOverride?.option || config?.option,
    })
      .then(result => {
        const value = result?.data;
        setResult(prevData => {
          return {
            ...prevData,
            data: value,
            message: result?.message ?? 'Success',
            loading: false,
            status: REQ_STATUS.SUCCESS,
          };
        });
      })
      .catch(err => {
        setResult(prevData => {
          let errMsg = err?.response?.data?.data?.message;
          return {
            ...prevData,
            loading: false,
            error: err,
            message: errMsg ?? err?.message,
            status: REQ_STATUS.FAILED,
          };
        });
      });
  };
  let results = {
    data: result?.data,
    message: result?.message,
    error: result?.error,
    isError: result?.error != null,
    loading: result?.loading,
    status: result?.status,
    fetchData,
  };
  // console.log(results);
  return results; 
};

export default useFetchData;

const fetchDataHooks = async ({
  body,
  urlPath,
  queryParams,
  header,
  option,
}: IFetchOptions) => {
  try {
    const headers = {
      Authorization: `token`,
      'Accept': `application/json`,
      ...header,
    };

    const options = {
      headers,
      method: 'GET',
      body: body ? JSON.stringify(body) : null,
      ...option,
    };

    const response = await fetch(BASE_URL +  urlPath + objectToQueryParams(queryParams), options);
    let data = await response.json();
    // console.log(urlPath, response);
    // console.log(data);

    if (response.status === 401) {
      throw {
        data: null,
        error: 401,
        message: data?.message,
        status: REQ_STATUS.FAILED,
      };
    }

    if (response.status === 400 || response.status > 401) {
      throw {
        data: null,
        error: data,
        message:data?.message,
        status: REQ_STATUS.FAILED,
      };
    }

    return {
      data: data,
      error: null,
      message: data?.message,
      status: REQ_STATUS.SUCCESS,
    };
  } catch (error: any) {
    console.log('error', error);
    throw {
      data: null,
      error: error,
      message: error?.message,
      status: REQ_STATUS.FAILED,
    };
  }
};
