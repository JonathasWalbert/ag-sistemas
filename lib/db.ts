import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI!;

if(!MONGODB_URI) throw new Error("Variável não encontrada no .env");

export async function connectDB(){
    if(mongoose.connection.readyState === 1) return;

    return mongoose.connect(MONGODB_URI);
}