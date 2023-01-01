import axios from "axios";
import jwtDecode from "jwt-decode";
import qs from "qs";
import { useUser } from "../../contexts/UserContext";

export const DEFAULT_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export const setDefaultHeader = (token) => {
  DEFAULT_API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const checkTokenValidity = (token) => {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
};
