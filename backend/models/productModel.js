import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: mongoose.ObjectId,
        ref: "Category",
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping:{
        type: String,
        required: true
    }


},{timestamps: true})

export default mongoose.model('Product',productSchema)