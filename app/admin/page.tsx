"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardIntent from "./components/cardIntent";
import { div } from "motion/react-client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Admin() {
    const [user, setUser] = useState(process.env.NEXT_PUBLIC_USER_ADMIN || null);
    const [listIntent, setListIntent] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

        async function getIntents(){
            const res = await fetch("/api/admin/intent", {cache: "no-store"});
            const { data } = await res.json();
            setListIntent(data);
            setLoading(false);
        }

    useEffect(() => {
        if (!user){
            router.push("/");
        }

        getIntents();
        
    },[])

 return (
    <div className="min-h-screen bg-black/25 py-5">
        {loading ? (
            <div className="space-y-2 flex flex-col justify-center lg:mx-auto lg:max-w-5xl mt-14 mx-4">
                <Skeleton className="w-56 h-10 mt-5 bg-white/25" />

                <Skeleton className="w-full h-48 bg-white/25" />

                <Skeleton className="w-full h-48 bg-white/25" />

                <Skeleton className="w-full h-48 bg-white/25" />
            </div>
        ):(
            <div className="lg:mx-auto lg:max-w-5xl ">
        <h1 className="font-bold text-2xl mx-4 pt-20">Página do Administrador</h1>

        
        {listIntent.map((item) => (
            <div key={item._id} className="border border-black rounded-sm mx-4 p-2 my-5 shadow-2xl bg-white/25">
                <CardIntent data={item} refreshList={getIntents} />
            </div>
        ))}

        </div>
        )}

    </div>

 );
}