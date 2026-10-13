import mongoose from 'mongoose';

const tourOperatorSchema = new mongoose.Schema({
  operatorName: { type: String, required: true },
  company: { type: String, required: true },
  accountNumber: { type: String, required: true },
  destinationName: { type: String, required: true },
  destinationImage: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  price: { type: Number, required: true },
  days: { type: Number, default: 1 },
  nights: { type: Number, default: 0 },
  touristSpots: [String],
  vehicleTypes: [String],
  accommodations: [String],
  touristTypes: [String],
  facilities: [String],
departures: [
  {
    city: { type: String, required: true },
    singlePrice: { type: Number, required: true },
    couplePrice: { type: Number, required: true }
  }
],
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('TourOperator', tourOperatorSchema);
