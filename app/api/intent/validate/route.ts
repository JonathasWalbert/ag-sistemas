import { Intent } from "@/app/modules/intent/intent.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try{
        await connectDB();

        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        const intent = await Intent.findOne({approvalToken: token});

        if(!intent || intent.status !== "APROVADO"){
            return NextResponse.json({valid: false});
        }

        return NextResponse.json({valid: true, intent: {id: intent._id, nome: intent.nome, email: intent.email, empresa: intent.empresa}});

    }catch(error){
        console.error(error);
        return NextResponse.json({valid: false});
    }
}