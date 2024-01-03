import axios from "axios";
import { REQUEST_COMMON_PREFIX } from "../utils/pathnames";

export const BASE_URL = process.env.REACT_APP_REQUEST_URL;

export const request = axios.create({
  baseURL: BASE_URL + REQUEST_COMMON_PREFIX,
  withCredentials: true
})