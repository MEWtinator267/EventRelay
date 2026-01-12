import axios from "axios";

const api = axios.create({
  baseURL: "http://43.204.183.192:4000/api",
});

export default api;