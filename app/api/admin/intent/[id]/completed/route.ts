import { Intent } from "@/app/models/intent/intent.model";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, {params}){
    try{
        await connectDB();

        const { id } = await params;
        const { status } = await req.json();

        const intent = await Intent.findByIdAndUpdate(id, {
            status: status,
        },
        {new: true}
    );


    return NextResponse.json({success: true}, {status: 200})
    }catch(error){
        console.error(error)
        return NextResponse.json({success: false}, {status: 500});
    }

}