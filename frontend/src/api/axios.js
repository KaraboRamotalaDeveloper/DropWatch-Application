import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, // Crucial for sending/receiving HTTP-Only cookies
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default api;
