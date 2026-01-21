import axios from "axios";

const api = axios.create({
  baseURL: "http://3.6.186.60:4000/api",
});

export default api;