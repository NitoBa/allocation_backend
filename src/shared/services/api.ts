import axios, { AxiosInstance } from 'axios';
const BASE_URL = process.env.BASE_URL;
const api: AxiosInstance = axios.create({ baseURL: BASE_URL, timeout: 10000 });

export { api };
