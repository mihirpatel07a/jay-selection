import mongoose, { Schema } from "mongoose";
import { type } from "os";

const Userschema  = new Schema({
    username : {
        type : String , 
        required : true, 

    },
    email : {
        type : String , 
        required : true, 
        unique : true
    },
    password : {
        type : String , 
        required : true, 
        
    }

},{
    timestamps : true
})

const User = mongoose.model('User' , Userschema);

export default user;