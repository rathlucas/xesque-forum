"use client";

import {Form, FormControl, FormField, FormItem, FormLabel,} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import SubmitPostButton from "@/components/button/SubmitPostButton";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "O título deve conter ao menos 4 caracteres",
  }),
  content: z.string().min(4, {
    message: "O conteúdo deve conter ao menos 4 caracteres",
  }),
});

export interface PostFormSchema extends z.infer<typeof formSchema> {
}

export default function CreatePostForm() {

  const form = useForm<PostFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => console.log("aeee"))} className="w-full px-20">
          <FormField name="title" control={form.control} render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="title">Título</FormLabel>
                <FormControl>
                  <Input {...field} id="title" type="text" placeholder="Digite o título da postagem"
                         className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500
                          block w-full sm:text-sm border-gray-300 rounded-md"/>
                </FormControl>
                <p className={"text-sm text-destructive"}>
                  {form?.formState?.errors?.title?.message}
                </p>
              </FormItem>
          )}/>
          <FormField name="content" control={form.control} render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="content">Conteúdo</FormLabel>
                <FormControl>
                  <Textarea  {...field} rows={15} id="content" placeholder="Digite o conteúdo da postagem"
                             className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500
                          block w-full sm:text-sm border-gray-300 rounded-md"/>
                </FormControl>
                <p className={"text-sm text-destructive"}>
                  {form?.formState?.errors?.title?.message}
                </p>
              </FormItem>
          )}/>
          <div className="flex justify-end">
            <SubmitPostButton type={"submit"}/>
          </div>
        </form>
      </Form>
  );
}
