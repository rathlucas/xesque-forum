"use server";

import { api } from "@/api/AxiosConfig";
import { LoginFormSchema } from "@/components/form/LoginForm";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function onSubmit(values: LoginFormSchema) {
  try {
    const response = await api.post("/auth/login", values);
    console.log(response.status, response.data);
    if (response.status === 200) {
      cookies().set("token", response.data as string);
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("Error:", e.response?.data);
      throw e;
    }
  }
  redirect("/");
}
