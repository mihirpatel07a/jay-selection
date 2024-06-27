import mongoose, { Mongoose, Schema } from "mongoose";

const querySchema = new Schema({
     
     name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    message : {
        type: String,
        required: true,
    },
},{timestamps : true}
)

const Query = mongoose.model('queries' , querySchema);

export default Query;