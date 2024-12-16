import axios from "axios";

const api = axios.create({
  baseURL: `https://127.0.0.1/`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
