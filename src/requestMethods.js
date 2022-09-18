import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const todoRequest = axios.create({
  baseURL: BASE_URL,
});
export const mlbRequest = axios.create({
  baseURL: BASE_URL,
});
