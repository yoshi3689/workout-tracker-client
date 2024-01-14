import axios from "axios";
import { REQUEST_COMMON_PREFIX } from "../utils/pathnames";

export const BASE_URL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? process.env.REACT_APP_REQUEST_URL : process.env.REACT_APP_REQUEST_URL_PROD;

export const request = axios.create({
  baseURL: BASE_URL + REQUEST_COMMON_PREFIX,
  withCredentials: true
})