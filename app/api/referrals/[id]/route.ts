import { Referral } from "@/app/modules/referral/referral.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request, {params}:{params: {id: string}}){
    try{
        const { id } = await params;
        if (!id) {
      return NextResponse.json(
        { success: false, message: "ID não informado." },
        { status: 400 }
      );
    }

        await connectDB();

        const referralsList = await Referral.find({
            ownerId: id,
            status: { $nin: ["RECUSADO", "FECHADO"] },
        }).sort({createdAt: -1});

        // if(!referralsList || referralsList.length === 0){
        //     return NextResponse.json({
        //         success: true,
        //         message: "Nenhuma indicação encontrada."
        //     }, {status: 404});
        // }

        return NextResponse.json({
            success: true,
            data: referralsList
        }, {status: 200});

    }catch(error){
        console.error("Erro ao carregar detalhes da indicação: ", error);
        return NextResponse.json({
            message: "Falha ao carregar detalhes da indicação."
        }, {status: 500});
    }

}