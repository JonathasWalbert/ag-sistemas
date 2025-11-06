import { Referral } from "@/app/modules/referral/referral.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const newReferral = await Referral.create({ 
            ownerId: body.ownerId,
            nome: body.nome,
            empresa: body.empresa,
            contato: body.contato,
            oportunidade: body.oportunidade,
            status: "NOVA",
        });

        return NextResponse.json(
            { message: "Indicação registrada com sucesso", data: newReferral },
            { status: 201 }
        );

    }catch (error) {
        console.error("Erro ao registrar indicação: ", error);
        return NextResponse.json(
            { message: "Erro ao registrar indicação" },
            { status: 500 }
        );
    }
}