
import mongoose, { Mongoose, Schema } from "mongoose";

// Define schema
const cartItemSchema = new mongoose.Schema({
    id : {type : String , required : true},
  name: { type: String, required: true },
  userid : {type : String , required : true},
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  totalprice : {type : Number , required : true },
  quantity: { type: Number, required: true },
  imageSrc: { type: String, required: true },
});

// Define model
const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem;
