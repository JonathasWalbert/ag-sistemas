"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ButtonAreaMembro() {

 return (
    <Button variant="outline" className="bg-transparent border-black/10 relative overflow-hidden shadow">
        <Link href="/area-membro">Já sou membro</Link>
    </Button>
 );
}