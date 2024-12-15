const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  fullName: String,
  amount: Number,
  email: String,
  mobileNumber: String,
  address:String,
  productName: String,
});

module.exports = mongoose.model("Payment", paymentSchema);
