import axios from "axios";

const api = axios.create({
  baseURL: "http://52.66.7.92:4000",
});

export default api;