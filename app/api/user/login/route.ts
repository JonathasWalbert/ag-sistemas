import { User } from "@/app/models/user/user.model.";
import { connectDB } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        await connectDB();
        const body = await req.json();

        const user = await User.findOne({
            nome: body.nome,
            email: body.email,
            empresa: body.empresa,
        })

        if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }


    const res = NextResponse.json(
  { message: "Login realizado com sucesso", data: user },
  { status: 200 }
);


    res.cookies.set({
      name: "userLogged",
      value: JSON.stringify({
        id: user._id,
        email: user.email,
        nome: user.nome,
        empresa: user.empresa,
      }),
      httpOnly: true,
      path: "/", 
      maxAge: 60 * 60 * 1,
    });

    return res;
    }catch(error){
        console.error("Erro ao logar usuario: ", error);
        return NextResponse.json(
            {message: "Erro ao logar usuario"},
            {status: 500}
        );
    }

}