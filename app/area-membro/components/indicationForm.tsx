"use client"

import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const formSchema = z.object({
    nome: z.string().min(1,"Digite seu nome").max(50),
    empresa: z.string().min(1,"Digite o nome da empresa").max(50),
    contato: z.string().min(1,"Digite o contato").max(100),
    oportunidade: z.string().min(10, {
        message: "Descreva qual a oportunidade"
    }),
});

export default function IndicationForm({user}) {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            nome: "",
            empresa: "",
            contato: "",
            oportunidade: "",
            }
        })

    async function onSubmit(values: z.infer<typeof formSchema>){
      try{
        setLoading(true);

        const payload = {...values, ownerId: user.id };

        const res = await fetch("/api/referrals", {
          method: "POST",
          headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
            });

          await res.json();
          
          toast.success("Indicação enviada com sucesso!", {
            position: "top-center"
          });
          form.reset();
          setLoading(false);

      }catch(error){
        toast.error("Erro ao enviar indicação. Tente novamente.", {
          position: "top-center"
        }); 
        setLoading(false);
        return;
      } 
    }

 return (
   <div className="mt-2 border rounded-sm p-4 border-black/25 relative overflow-hidden shadow-2xl">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Membro indicado" {...field} className="border-black bg-white/25 font-medium text-sm"  />
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
                <Input placeholder="Nome da empresa" {...field} className="border-black bg-white/25 font-medium text-sm"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contato</FormLabel>
              <FormControl>
                <Input placeholder="Telefone ou email" {...field} className="border-black bg-white/25 font-medium text-sm"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="oportunidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oportunidade</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva a qual a oportunidade" {...field} className="border-black bg-white/25 font-medium h-36 text-sm"/>
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