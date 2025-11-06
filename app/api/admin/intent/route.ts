import { Intent } from "@/app/models/intent/intent.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();

        const intents = await Intent.aggregate([
          {
    $match: {
      status: { $ne: "CONCLUIDO" }
    }
  },
      {
        $addFields: {
          sortOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$status", "PENDENTE"] }, then: 1 },
                { case: { $eq: ["$status", "APROVADO"] }, then: 2 },
                { case: { $eq: ["$status", "REJEITADO"] }, then: 3 },
              ],
              default: 4
            }
          }
        }
      },
      { $sort: { sortOrder: 1, createdAt: -1 } },
      { $project: { sortOrder: 0 } }
    ]);

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