import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json(
    { message: "Logout realizado com sucesso" },
    { status: 200 }
  );
  res.cookies.delete("userLogged");
  return res;
}