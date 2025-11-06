import { Referral } from "@/app/models/referral/referral.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, {params}: string){
    try{
        await connectDB();

        const { id } = await params;
        const { status } = await req.json();

        const updated = await Referral.findByIdAndUpdate(id, { status }, {new: true});

        if (!updated) {
            return NextResponse.json({ success: true, message: "Nenhum documento encontrado." }, { status: 200 });
        }

        return NextResponse.json({ success: true, referral: updated, message: "Atualizado com sucesso !"});

    }catch(error){
        console.error("Erro: " + error);
        return NextResponse.json({ success: false, error: "Falha ao atualizar o status"},
            {status: 500}
        ); 
    }

}