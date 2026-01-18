import mongoose from "mongoose";

const VaultSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    username: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true,
        required: true
    },
    upassword: {
        type: String,
        required: true,
    },
    keyword: { // as G-ptag
        type: String,
        required: true,
        trim: true,
    },
    note:{
        type:String,
    }
}, { timestamps: true })

export const Vault = mongoose.model("Vault",VaultSchema);