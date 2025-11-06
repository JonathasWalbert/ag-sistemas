"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ButtonLogout() {

    async function handleLogout(){
      const res = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });

      if(res.ok){
        window.location.href = "/";
        toast.success("Logout realizado com sucesso!", {
          position: "top-center"
        });
      }else{
        toast.error("Erro ao realizar logout. Tente novamente.", {
          position: "top-center"
        });
      }
    }

 return (
    <Button variant="outline" className="bg-transparent border-black/10 relative overflow-hidden shadow" onClick={handleLogout}>Sair</Button>
 );
}   