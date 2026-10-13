import mongoose from "mongoose";

const tourBookingSchema = new mongoose.Schema({
  destinationName: { type: String, required: true },
  destinationImage: String,
  operatorName: String,
  company: String,
  email: String,
  phone: String,
  price: { type: Number, required: true },
  days: Number,
  nights: Number,
  touristSpots: [String],
  vehicleTypes: [String],
  accommodations: [String],
  touristTypes: [String],
  facilities: [String],
  bookedBy: { type: String, required: true },
  persons: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, {
  timestamps: true
});

const TourBooking = mongoose.model("TourBooking", tourBookingSchema);
export default TourBooking;
