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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onSubmit } from "@/app/login/actions";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "O nome de usuário deve conter ao menos 4 caracteres",
  }),
  password: z.string().min(6, {
    message: "A senha deve conter ao menos 6 caracteres",
  }),
});

export interface LoginFormSchema extends z.infer<typeof formSchema> {}

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const action: () => void = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <div className={"h-screen bg-green-600 p-10"}>
      <h1 className={"text-2xl text-primary-foreground"}>
        Seja Bem Vindo ao Fórum do Xesque!
      </h1>
      <Separator className={"mt-3"} />
      <p className={"text-primary-foreground mb-6"}>
        Realize o login para continuar
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
          <Button type={"submit"}>Login</Button>
        </form>
      </Form>
      <Separator className={"mt-3"} />
      <p className={"text-primary-foreground mb-6"}>
        Não possui uma conta?
        <Link href={"/register"}>Registre-se</Link>
      </p>
    </div>
  );
}
