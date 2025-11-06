"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CardReferral({user}) {
    const [loading, setLoading] = useState(true);
    const [listReferrals, setListReferrals] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if(!user){
            router.push("/login");
            toast.error("Acesso negado. Faça login para continuar.", {
                position: "top-center"
              })
        }
        getReferrals();

    },[user])

    async function getReferrals(){
        try{
            const res = await fetch(`/api/referrals/${user.id}`, {cache: "no-store"});

            if(!res.ok){
                toast.error("Não foi possível carregar suas indicações.", {
                    position: "top-center"
                  })
                return;
            }

            const {data} = await res.json();
            setListReferrals(data);
            console.log(data);

        }catch(err){
            console.error("Erro ao carregar indicações: ", err);
            toast.error("Não foi possível carregar suas indicações.", {
                position: "top-center"
              })

        }finally{
            setLoading(false);
        }
        
    }

        async function handleChangeStatus(id: string, value : string){
        try{
          setListReferrals((prev) => prev.filter((item) => item._id !== id));
          
            const res = await fetch(`/api/referrals/status/${id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({status: value})
            });

            const result = await res.json();
            if(result) {
              getReferrals();
              toast.success("Status Atualizado!", {
                position: "top-center"
              })
            }

        }catch(err){
            console.error(err);
            toast.success("Não foi possível atualizar - " + err, {
                position: "top-center"
              })
        }
           
        
    }


 return (
   <div>
     {loading ? (
       <div className="mt-5 space-y-2 w-full">
         <Skeleton className="h-36 bg-white/50" />
         <Skeleton className="h-36 bg-white/50" />
         <Skeleton className="h-36 bg-white/50" />
         <Skeleton className="h-36 bg-white/50" />
       </div>
     ) : listReferrals.length === 0 ? (
      <div className="">
        <p className="font-bold lg:text-2xl text-center my-56">Você ainda não fez nenhuma indicação...</p>
      </div>
     ) : (
       <>
         {listReferrals.map((data) => (
           <div className="lg:flex lg:justify-between border border-black/75 rounded p-2 mt-2" key={data._id}>
             <div className="flex flex-col space-y-1">
               <p className="text-base font-medium">
                 Nome: <span className="font-normal text-sm">{data.nome}</span>
               </p>
               <p className="text-base font-medium">
                 Empresa: <span className="font-normal text-sm">{data.empresa}</span>
               </p>
               <p className="text-base font-medium">
                 Contato: <span className="font-normal text-sm">{data.contato}</span>
               </p>
               <span className="text-base font-medium">
                 Oportunidade: <p className="font-normal text-sm border border-black/25 rounded p-1 mt-1 bg-white/25 mx-1">{data.oportunidade}</p>
               </span>
             </div>

             <div className="my-5 lg:my-0 lg:p-2">
               <Select
                 defaultValue={data?.status}
                 onValueChange={(value) => handleChangeStatus(data._id, value)}
               >
                 <SelectTrigger
                    className={`w-full lg:w-40 border-black/50 font-medium ${
                    data.status === "NOVA"
                    ? "text-yellow-800"
                    : data.status === "EM CONTATO"
                    ? "text-blue-800"
                    : data.status === "FECHADO"
                    ? "text-green-800"
                    : data.status === "RECUSADO"
                    ? "text-red-800"
                    : "text-gray-700"
                    }`}
                >
                   <SelectValue placeholder={data?.status} />
                 </SelectTrigger>

                 <SelectContent>
                   <SelectItem value="NOVA">🕓 NOVA</SelectItem>
                   <SelectItem value="EM CONTATO">🗣️ EM CONTATO</SelectItem>
                   <SelectItem value="FECHADO">✅ FECHADO</SelectItem>
                   <SelectItem value="RECUSADO">❌ RECUSADO</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </div>
         ))}
       </>
     )}
   </div>
 );
}