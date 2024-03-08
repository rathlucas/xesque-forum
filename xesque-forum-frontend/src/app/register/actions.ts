"use server";

import { api } from "@/api/AxiosConfig";
import { RegisterFormSchema } from "@/components/form/RegisterForm";
import { redirect } from "next/navigation";

export async function onSubmit(values: RegisterFormSchema) {
  try {
    const res = await api.post("/auth/register", values);
    console.log(res.status, res.request);
    if (res.status === 201) {
      console.log("Usuário registrado com sucesso!");
    }
  } catch (e) {
    console.error("Error:", e);
    throw e;
  }
  redirect("/login");
}
