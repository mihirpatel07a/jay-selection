import mongoose, { Schema } from "mongoose";


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
        
    },

    avatar : {
        type : String , 
        default : "https://imgs.search.brave.com/ND_yp1b-st3_qegCfZDLErw610T-H2JCINi1AseH5cA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzgzLzkwLzk1/LzM2MF9GXzQ4Mzkw/OTU2OV9PSTRMS05l/RmdId3Z2Vmp1NjBm/ZWpMZDlnajQzZElj/ZC5qcGc"
    }

},{
    timestamps : true
})

const User = mongoose.model('User' , Userschema);

export default User;