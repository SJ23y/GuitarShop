import axios, { AxiosError, AxiosInstance } from 'axios';
import { Setting, StatusCodeMapping } from '../consts';
import { getToken } from './token';
import { DetailMessageType } from '../types/auth';
import { toast } from 'react-toastify';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: Setting.BaseUrl,
    timeout: Setting.ApiTimeout,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && StatusCodeMapping[error.response.status]) {
        toast.warn(error.response.data.message, {
          position: 'top-center',
          theme: 'colored',
        });
      }
      throw error;
    },
  );

  return api;
};

export { createAPI };
