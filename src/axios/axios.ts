import axios from "axios";
import { REQUEST_COMMON_PREFIX } from "../utils/pathnames";

export const BASE_URL = process.env.NODE_ENV === "production" ? 'https://www.yn-track-wo.xyz' : 'http://localhost:5001';

export const request = axios.create({
  baseURL: BASE_URL + REQUEST_COMMON_PREFIX,
  withCredentials: true
})