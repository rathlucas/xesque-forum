"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { api } from "@/api/AxiosConfig";
import { useRouter } from "next/navigation";
import { onSubmit } from "@/app/register/actions";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "O nome de usuário deve conter ao menos 4 caracteres",
  }),
  email: z.string().email({
    message: "O email precisa ser válido",
  }),
  password: z.string().min(6, {
    message: "A senha deve conter ao menos 6 caracteres",
  }),
});

export interface RegisterFormSchema extends z.infer<typeof formSchema> {}

export default function RegisterForm() {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const action: () => void = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <div className={"h-screen bg-green-600 p-10"}>
      <h1 className={"text-2xl text-primary-foreground"}>
        Seja Bem Vindo ao Xesque Forum!
      </h1>
      <Separator className={"mt-3"} />
      <p className={"text-primary-foreground mb-6"}>
        Registre-se para continuar
      </p>
      <Form {...form}>
        <form action={action} className={"space-y-8"}>
          <FormField
            control={form.control}
            name={"username"}
            render={({ field }) => (
              <FormItem className={"flex flex-col"}>
                <FormLabel className={"text-primary-foreground"}>
                  Nome de Usuário
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className={"flex flex-col"}>
                <FormLabel className={"text-primary-foreground"}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem className={"flex flex-col"}>
                <FormLabel className={"text-primary-foreground"}>
                  Senha
                </FormLabel>
                <FormControl>
                  <Input type={"password"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type={"submit"}>Registre-se</Button>
        </form>
      </Form>
    </div>
  );
}
