import { Intent } from "@/app/modules/intent/intent.model";
import { connectDB } from "@/lib/db";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Response, {params}){
    try{
        await connectDB();

        const { id } = await params;
        const { status } = await req.json();
        const token = randomUUID();

        const intent = await Intent.findByIdAndUpdate(id, {
            status: status,
            approvalToken: token,
            approvedAt: new Date(),
        },
        {new: true}
    );

    const link = `http://localhost:3000/cadastro-final?token=${token}`;

    console.log("Email enviado");
    console.log("Siga este link para completar seu cadastro - " + link);

    return NextResponse.json({success: true, link})
    }catch(error){
        console.error(error)
        return NextResponse.json({success: false}, {status: 500});
    }

}