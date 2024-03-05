"use client"

import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";

interface LoginFormProps {
}

const formSchema = z.object({
  username: z.string().min(4, {
    message: "O nome de usuário deve conter ao menos 4 caracteres"
  }),
  password: z.string().min(6, {
    message: "A senha deve conter ao menos 6 caracteres"
  })
})

export default function LoginForm(props: LoginFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("https://xesque-forum-backend-production.up.railway.app/auth/login", values);
      if (response.status === 200) {
        router.push("/home")
      }
    } catch (e) {
      console.error("Error:", e)
    }
  }

  return (
      <div className={"h-screen bg-green-600 p-10"}>
        <h1 className={"text-2xl text-primary-foreground"}>Seja Bem Vindo ao Xesque Forum!</h1>
        <Separator className={"mt-3"}/>
        <p className={"text-primary-foreground mb-6"}>Realize o login para continuar</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8"}>
            <FormField
                control={form.control}
                name={"username"}
                render={({field}) => (
                    <FormItem className={"flex flex-col pr-64"}>
                      <FormLabel className={"text-primary-foreground"}>Nome de Usuário</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                    </FormItem>
                )}/>
            <FormField
                control={form.control}
                name={"password"}
                render={({field}) => (
                    <FormItem className={"flex flex-col pr-64"}>
                      <FormLabel className={"text-primary-foreground"}>Senha</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                )}/>
            <Button type={"submit"}>Login</Button>
          </form>
        </Form>
        <Separator className={"mt-3"}/>
        <p className={"text-primary-foreground mb-6"}>Não possui uma conta?
          <Link href={"/register"}>Registre-se</Link>
        </p>
      </div>
  )
}