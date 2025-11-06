import mongoose from "mongoose";

const IntentSchema = new mongoose.Schema({
    nome: String,
    email: String,
    empresa: String,
    motivo: String,
    status: {
        type: String,
        enum: ["PENDENTE", "APROVADO", "REJEITADO", "COMPLETO"],
        default: "PENDENTE"
    },
    approvalToken: String,
    approvedAt: Date,
},
    { timestamps: true }
);

export const Intent = mongoose.models.Intent || mongoose.model("Intent", IntentSchema);