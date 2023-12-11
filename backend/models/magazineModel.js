import mongoose from "mongoose"; 
const magazineSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    slug :{
        type: String,
        required: true,
        unique: true
    },
    description : {
        type: String,
        required: true,
    },
    photo:{
        data: Buffer,
        contentType: String,
    }
},{timestamps: true});
export default mongoose.model("magazine", magazineSchema)