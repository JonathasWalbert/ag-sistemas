"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
    nome: z.string().min(1, {
        message: "Digite seu nome"
    }).max(50),
    email: z.email("Email inválido"),
    motivo: z.string().min(10, {
        message: "Digite seu motivo com no mínimo 10 caracteres"
    }).max(250),
});


export default function IntentForm(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            nome: "",
            email: "",
            motivo: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        try{
          const res = await fetch("/api/intent", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(values),
          });

          await res.json();
          alert("Intenção enviada com sucesso!");
          form.reset();

        }catch(err){
          console.error(err);
          alert("Erro ao enviar intenção.");
        }
    }
    
    return(
    <div className="max-w-5xl mx-auto my-8 border-2 rounded-sm p-4">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} className="" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@gmail.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="motivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo</FormLabel>
              <FormControl>
                <Input placeholder="Por que você quer participar ?" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="lg">Enviar</Button>
      </form>
    </Form>
    </div>
    );

}