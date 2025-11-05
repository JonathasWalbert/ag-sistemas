"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Form, 
    FormControl,  
    FormField, 
    FormItem, 
    FormLabel, 
    } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BorderBeam } from "../ui/border-beam";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const formSchema = z.object({
    nome: z.string().min(1, "Digite seu nome").max(50),
    email: z.email("Email inválido"),
    empresa: z.string().min(1, "Digite o nome da sua empresa"),
    telefone: z.string().min(11,"11984051486"),
    idade: z.coerce.number().int().min(1),
    cidade: z.string().min(1,"Digite sua cidade"),
    estado: z.string().min(1,"Digite seu estado")
});

const initialValues = {
  nome: "",
  email: "",
  empresa:"",
  telefone: "",
  idade: 0,
  cidade: "",
  estado: ""
}


export default function CompleteIntentForm({data}){
  const [loading, setLoading] = useState(false);

  const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });


    useEffect(() => {
      if(!data) return;

      form.reset({
        nome: data.nome,
        email: data.email,
        empresa: data.empresa,
        telefone: data?.telefone,
        idade: data?.idade,
        cidade: data?.cidade,
        estado: data?.estado
      })

    }, [form])

    async function onSubmit(values: z.infer<typeof formSchema>){
        try{
          setLoading(true);
          const res = await fetch("/api/user/register", {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(values),
          });

          await res.json();
          toast.success("Usuário cadastrado com sucesso!");
          form.reset();
          
          await fetch(`/api/admin/intent/${data.id}/completed`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({status: "CONCLUIDO"})
          });
          
          setLoading(false);
          router.push("/cadastrado")
          
        }catch(err){
          console.error(err);
          setLoading(false);
          toast.error("Erro ao cadastrar usuário");
        }
    }
    
    return(
    <div className="my-8 border-2 border-black/25 rounded-sm p-4 relative">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} className="border-black bg-white/25 font-medium" />
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
                <Input placeholder="email@gmail.com" {...field} className="border-black bg-white/25 font-medium" />
              </FormControl>
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
                <Input placeholder="Nome da empresa" {...field} className="border-black bg-white/25 font-medium" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="11984051486" {...field} className="border-black bg-white/25 font-medium" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Input type="number" placeholder="18" {...field} className="border-black bg-white/25 font-medium"/>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="São Paulo" {...field} className="border-black bg-white/25 font-medium" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder="Bahia" {...field} className="border-black bg-white/25 font-medium" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          {loading ? (
            <Button type="submit" size="lg" disabled className="w-full lg:w-1/2"><Spinner/> Cadastrando</Button>
            ):(
            <Button type="submit" size="lg" className="w-full lg:w-1/2">Cadastrar</Button>
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