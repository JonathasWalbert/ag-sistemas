import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nome: String,
    email: String,
    empresa: String,
    telefone: String,
    idade: Number,
    cidade: String,
    estado: String,
},
    {timestamps:true}
)

export const User = mongoose.models.User || mongoose.model("User", UserSchema);