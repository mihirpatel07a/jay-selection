
import mongoose, { Mongoose, Schema } from "mongoose";

const ItemSchema = new Schema({
     title : {
        type : String , 
        required : true ,
     },

     description : {
        type : String , 
        required : true ,
     },
     brand: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    
    gender: {
        type: String,
        required: true
    },
    size: {
        type: [String],
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    } ,
    discount : {
        type : Number,
        required : true
    },

    stock_quantity : {
        type : Number,
        required : true
   } , 
   availability : {
        type: Boolean ,
        required : true 
   },
   imageUrls : {
        type : [String] , 
        required : true

   }

},
{
    timestamps : true
})

const Item = mongoose.model('Items' , ItemSchema);

export default Item;
