"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Form, 
    FormControl,  
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage, 
    } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { BorderBeam } from "@/components/ui/border-beam";

const formSchema = z.object({
    nome: z.string().min(1, {
        message: "Digite seu nome"
    }).max(50),
    email: z.email("Email inválido"),
    empresa: z.string().min(1, {
      message: "Digite o nome da sua empresa"
    }),
    motivo: z.string().min(10, {
        message: "Digite seu motivo com no mínimo 10 caracteres"
    }).max(250),
});


export default function IntentForm(){
  const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            nome: "",
            email: "",
            empresa: "",
            motivo: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        try{
          setLoading(true);
          const res = await fetch("/api/intent", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(values),
          });

          await res.json();
          setLoading(false);
          toast.success("Intenção enviada com sucesso!", {
            position: "top-center"
          });
          form.reset();

        }catch(err){
          setLoading(false);
          console.log(err);
          toast.error("Erro ao enviar intenção.", {
            position: "top-center"
          });
        }
    }
    
    return(
    <div className="my-5 border-1 rounded-sm p-4 border-black/25 relative overflow-hidden">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} className="border-black bg-white/25 font-medium"  />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="email@gmail.com" {...field} className="border-black bg-white/25 font-medium"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="empresa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Nome da empresa" {...field} className="border-black bg-white/25 font-medium"/>
              </FormControl>
              <FormMessage />
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
                <Textarea placeholder="Por que você quer participar ?" {...field} className="border-black bg-white/25 font-medium h-36"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          {loading ? (
            <Button type="submit" size="lg" disabled className="w-full lg:w-1/2"><Spinner/> Enviando</Button>
            ):(
            <Button type="submit" size="lg" className="w-full lg:w-1/2">Enviar</Button>
            )}
          
        </div>
      </form>
      <BorderBeam
        duration={4}
        size={300}
        reverse
        className="from-transparent via-black to-transparent"
      />
    </Form>
    </div>
    );

}