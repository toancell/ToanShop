import mongoose from "mongoose";
const categorySchema= new mongoose.Schema({
    name:{
        type: String,
    },
    slug:{
        type: String,
        lowerCase: true,
    }
})
export default mongoose.model("Category", categorySchema) 