import axios from "axios";

const TODO_URL = "/api/todos";
const MLB_URL = "/api/mlb";

export const todoRequest = axios.create({
  baseURL: TODO_URL,
});
export const mlbRequest = axios.create({
  baseURL: MLB_URL,
});
