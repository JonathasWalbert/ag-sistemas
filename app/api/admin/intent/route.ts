import { Intent } from "@/app/modules/intent/intent.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();

        const intents = await Intent.find().sort({ createedAt: -1 });

        return NextResponse.json(
            { success: true, data: intents },
            { status: 200 }
        )


    }catch(error){
        console.error("Erro ao carregar documentos: ", error);
        return NextResponse.json(
            { message: "Falha ao carregar intenções." },
            { status: 500 }
        )
    }
}