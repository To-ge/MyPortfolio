import axios from "axios";

const TODO_URL = "https://togeportfolio.herokuapp.com/api/todos";
const MLB_URL = "https://togeportfolio.herokuapp.com/api/mlb";

export const todoRequest = axios.create({
  baseURL: TODO_URL,
});
export const mlbRequest = axios.create({
  baseURL: MLB_URL,
});
