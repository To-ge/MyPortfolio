import axios from "axios";

const TODO_URL = "http://localhost:5000/api/todos";
const MLB_URL = "http://localhost:5000/api/mlb";

export const todoRequest = axios.create({
  baseURL: TODO_URL,
});
export const mlbRequest = axios.create({
  baseURL: MLB_URL,
});
