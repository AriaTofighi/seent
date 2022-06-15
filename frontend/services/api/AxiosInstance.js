import axios from "axios";
import qs from "qs";

export const DEFAULT_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export const setDefaultHeader = (token) => {
  DEFAULT_API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
