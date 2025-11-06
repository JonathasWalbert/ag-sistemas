"use client"

import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const formSchema = z.object({
    nome: z.string().min(1,"Digite seu nome").max(50),
    email: z.email("Email inválido"),
    empresa: z.string().min(1,"Digite o nome da sua empresa").max(50),
});

export default function IndicationForm() {
    const [loading, setLoading] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            nome: "",
            email: "",
            empresa: "",
            }
        })

    async function onSubmit(values: z.infer<typeof formSchema>){
      setLoading(true);
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await res.json();

      if(!res.ok){
        toast.error(data.message || "Erro ao realizar login.", {
          position: "top-center"
        });
        setLoading(false);
        
      }
      toast.success("Login realizado com sucesso!", {
          position: "top-center"
        });
      setLoading(false);
       setTimeout(() => {
        window.location.href = "/area-membro";
      }, 800);
    }

 return (
   <div className="mt-2 border rounded-sm p-4 border-black/25 relative overflow-hidden shadow-2xl">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col items-center">
            <h1 className="text-lg font-medium lg:text-2xl">Página de Login</h1>
            <p className="text-sm">Realize o login para continuar acessando...</p>
        </div>
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} className="border-black bg-white/25 font-medium text-sm"  />
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
                <Input placeholder="Digite seu email" {...field} className="border-black bg-white/25 font-medium text-sm"/>
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
                <Input placeholder="Nome da sua empresa" {...field} className="border-black bg-white/25 font-medium text-sm"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />      

        
        <div className="flex justify-center">
          {loading ? (
            <Button type="submit" size="lg" disabled className="w-full lg:w-1/2"><Spinner/> Entrando</Button>
            ):(
            <Button type="submit" size="lg" className="w-full lg:w-1/2">Entrar</Button>
            )}
          
        </div>
      </form>
      <BorderBeam duration={8} size={100} />
    </Form>
    </div>
 );
}