
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    orderId: {type:String, required:true},
    paymentInfo: {type:String, default:""},
    products: { type: Object, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "initiate", reuired: true },
  },
  { timestamps: true }
);


export default mongoose.models.order || mongoose.model("order",orderSchema)
