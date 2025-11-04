"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Admin() {
    const [user, setUser] = useState(process.env.NEXT_PUBLIC_USER_ADMIN || null);

    const router = useRouter();

    useEffect(() => {
        if (!user){
            router.push("/");
        }

        async function getIntents(){
            const res = await fetch("/api/admin/intent", {cache: "no-store"});
            const data = await res.json();
            console.log(data);
        }

        getIntents();
    },[])

 return (
   <div>
        <h1>Admin</h1>
   </div>
 );
}