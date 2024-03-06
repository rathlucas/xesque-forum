import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 7000,
})

api.interceptors.response.use((res) => {
  if (res.status === 401) {
    window.location.replace("/");
    return res;
  }
  return res;
})

export {api}