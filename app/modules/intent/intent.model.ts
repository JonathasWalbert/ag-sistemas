import mongoose from "mongoose";

const IntentSchema = new mongoose.Schema({
    nome: String,
    email: String,
    empresa: String,
    motivo: String,
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECT"],
        default: "PENDING"
    },
    approvalToken: String,
},
    {timestamps: true}
);

export const Intent = mongoose.models.Intent || mongoose.model("Intent", IntentSchema);