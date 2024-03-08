import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies().get("token")?.value}`,
  },
  timeout: 7000,
});

api.interceptors.response.use((res) => {
  if (res.status === 401) {
    redirect("/");
    cookies().delete("token");
    return res;
  }
  return res;
});

export { api };
