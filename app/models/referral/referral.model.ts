import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({
    ownerId: String,
    nome: String,
    empresa: String,
    contato: String,
    oportunidade: String,
    status: {
        type: String,
        enum: ["NOVA", "EM CONTATO", "FECHADA", "RECUSADA"],
        default: "NOVA"
    },
},
    {timestamps:true}
)   

export const Referral = mongoose.models.Referral || mongoose.model("Referral", ReferralSchema);