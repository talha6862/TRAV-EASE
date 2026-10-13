import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  destinationName: String,
  departureCity: String,
  touristSpots: [String],
  accommodations: [String],
  facilities: [String],
  activities: [String],
  couples: Number,
  males: Number,
  females: Number,
  totalPrice: Number,
  bookedBy: String,
  distance: String,
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
