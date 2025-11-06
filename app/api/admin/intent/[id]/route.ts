import { Intent } from "@/app/models/intent/intent.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, {params}: string){
    try{
        await connectDB();

        const { id } = await params;
        const { status } = await req.json();

        const updated = await Intent.findByIdAndUpdate(id, { status }, {new: true});

        if (!updated) {
            return NextResponse.json({ success: false, message: "Documento não encontrado" }, { status: 404 });
        }

        return NextResponse.json({ success: true, intent: updated, message: "Atualizado com sucesso !"});
    }catch(error){
        console.error("Erro: " + error);
        return NextResponse.json({ success: false, error: "Falha ao atualizar o status"},
            {status: 500}
        ); 
    }

}