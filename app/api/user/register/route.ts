import { User } from "@/app/models/user/user.model.";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        await connectDB();

        const body = await req.json();

        const newUser = await User.create({
            nome: body.nome,
            email: body.email,
            empresa: body.empresa,
            telefone: body.telefone,
            idade: body.idade,
            cidade: body.cidade,
            estado: body.estado,
        })

        return NextResponse.json({
            message: "Usuario criado com sucesso", data: newUser
        }, {status: 201});
    }catch(error){
        console.error("Erro ao salvar usuario: ", error);
        return NextResponse.json(
            {message: "Erro ao salvar usuario"},
            {status: 500}
        );
    }

}