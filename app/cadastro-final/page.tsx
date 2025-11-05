"use client"

import CompleteIntentForm from "@/components/common/completeIntentForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CadastroFinal() {
    const token = useSearchParams().get("token");
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);
    const [intent, setIntent] = useState(null);


    useEffect(() => {
        if(!token){
            router.push("/")
        }
        
        fetch(`/api/intent/validate?token=${token}`, {cache: "no-store"})
            .then((res) => res.json())
            .then((data) => {
                if(data.valid){
                    setValid(true);
                    setIntent(data.intent)
                    setLoading(false);
                    }
                    else{
                        setValid(false);
                        setLoading(false);
                    }
                }
            )

    },[token])

  
  if (loading || valid === null) {
    return <div className="min-h-screen bg-black/25 flex flex-col items-center justify-center">
        <div className="space-y-4 px-4 w-full lg:max-w-5xl lg:mx-auto">
        <Skeleton className="h-10 w-52 bg-white/50" />
        <Skeleton className="h-[700px] w-full bg-white/50" />
        </div>
    </div>;
  }else if (valid === false) {
    return <p className="min-h-screen flex items-center justify-center font-bold text-2xl">Link inválido ou expirado.</p>;
  }

 return (
    <div className="min-h-screen bg-black/25 pb-52">
    <div className="lg:mx-auto lg:max-w-5xl mx-4">
    <h1 className="font-bold text-lg lg:text-2xl pt-16">Cadastro Completo</h1>

    <div>
        {intent && <CompleteIntentForm data={intent} />}
    </div>
   </div>

  </div>
   
 );
}