import { defaultInstance } from '../config/default';

export interface axiosOptions {
  url?: string;
  method?: string;
  params?: {
    [param: string]: string | number | boolean;
  };
  data?:
    | FormData
    | {
        [data: string]: string | number | boolean;
      };
  headers?: {
    Authorization?: string;
  };
}

const fetch = async (options: axiosOptions) => {
  const client = defaultInstance({ ...options });
  await client;
  return client;
};

export default fetch;
