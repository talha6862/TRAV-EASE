// models/Trip.js
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  name: String,
  destination: String,
  description: String,
  image: String,
  price: Number,
  originalPrice: Number,
  totalPrice: Number,
  persons: Number,
  email: String,
  departureCity: String,
  selectedFacilities: [String],
  selectedSpots: [String],
  distanceFromCity: String
}, { timestamps: true });

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
