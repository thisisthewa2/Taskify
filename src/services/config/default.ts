import axios from 'axios';
import { getAccessToken } from '../utils/handleToken';

export const defaultInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
});

defaultInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  console.log(accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
