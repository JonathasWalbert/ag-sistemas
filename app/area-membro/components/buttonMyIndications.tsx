"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ButtonMyIndications() {
 return (
    <Button className="bg-black/70">
         <Link href="/area-membro/minhas-indicacoes">
            Minhas Indicações
         </Link>
      </Button>
 );
}