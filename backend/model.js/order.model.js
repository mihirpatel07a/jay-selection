
import mongoose, { Mongoose, Schema } from "mongoose";


const OrderSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    cartItems: { type: Object, required: true },
    totalSum: { type: Number, required: true }
  }, { timestamps: true });
  
  const Order = mongoose.model('Order', OrderSchema);

  export default Order;