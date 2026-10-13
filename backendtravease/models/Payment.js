// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  amount: { type: Number, required: true },
  destinationName: { type: String, required: true },
  paymentIntentId: { type: String, required: true },
  status: { type: String, default: "succeeded" },
  createdAt: { type: Date, default: Date.now },

  accountNumber: { type: String },
  operatorName: { type: String },
  company: { type: String },
  duration: { type: String },
  touristCounts: {
    couples: { type: Number, default: 0 },
    males: { type: Number, default: 0 },
    females: { type: Number, default: 0 },
  },
  selectedDeparture: {
    city: String,
    singlePrice: Number,
    couplePrice: Number
  },
  selectedSpots: [String],
  selectedAccommodations: [String],
  selectedActivities: [String],
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
