import { Intent } from "@/app/modules/intent/intent.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        await connectDB();
        const body = await req.json();

        const newIntent = await Intent.create({
            nome: body.nome,
            email: body.email,
            empresa: body.empresa,
            motivo: body.motivo,
            status: "PENDENTE",
        });

        return NextResponse.json(
        { message: "Registro enviado com sucesso", data: newIntent}, 
        { status: 201 }
    );

    }catch(error){
        console.error("Erro ao registrar documento: ", error);
        return NextResponse.json(
            {message: "Erro ao registrar documento"},
            {status: 500}
        );
    }
}