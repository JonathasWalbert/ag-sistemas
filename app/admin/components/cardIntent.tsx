import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import { toast } from "sonner";


export default function CardIntent({data, refreshList}) {
  const [loading, setLoading] = useState(false);

    async function handleChangeStatus(value : string){
      if(value === "REJEITADO" || value === "PENDENTE"){
        try{
          setLoading(true);
            const res = await fetch(`/api/admin/intent/${data._id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({status: value})
            });

            const result = await res.json();
            if(result) {
              refreshList();
              toast.success("Status Atualizado!")
            }

            setLoading(false);

        }catch(err){
            console.error(err);
            toast.success("Não foi possível atualizar - " + err)
            setLoading(false);
        }
      }else{
        try{
          setLoading(true);
            const res = await fetch(`/api/admin/intent/${data._id}/approved`, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({status: value})
            });

            const result = await res.json();
            if(result) {
              refreshList();
              toast.success("Status Atualizado!")
            }

            setLoading(false);

        }catch(err){
            console.error(err);
            toast.error("Não foi possível atualizar - " + err)
            setLoading(false);
        }
      }
        
    }
 return (
   <div className="lg:flex lg:justify-between">
        <div className="flex flex-col space-y-1">
            <p className="text-base font-medium">Nome: <span className="font-normal text-sm">{data?.nome}</span></p>
            <p className="text-base font-medium">Email: <span className="font-normal text-sm">{data?.email}</span></p>
            <p className="text-base font-medium">Empresa: <span className="font-normal text-sm">{data?.empresa}</span></p> 
            <span className="text-base font-medium">Motivo: <p className="font-normal text-sm">{data.motivo}</p></span>

        </div>

        <div className="m-2">
            <Select defaultValue={data?.status} onValueChange={handleChangeStatus}>
          <SelectTrigger
            className={`w-full lg:w-40 border-black/50 font-medium ${
              data.status === "PENDENTE"
                ? "text-yellow-800"
                : data.status === "APROVADO"
                ? "text-green-800"
                : data.status === "REJEITADO"
                ? "text-red-800"
                : "text-gray-700"
            }`}
          >
            
            <SelectValue placeholder={data.status} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="PENDENTE">🕓 PENDENTE</SelectItem>
            <SelectItem value="APROVADO">✅ APROVADO</SelectItem>
            <SelectItem value="REJEITADO">❌ REJEITADO</SelectItem>
          </SelectContent>
        </Select>
            
        </div>


   </div>
 );
}