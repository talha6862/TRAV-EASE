// models/TravelPreference.js
import mongoose from "mongoose";

const travelPreferenceSchema = new mongoose.Schema(
  {
    destination: String,
    travelDate: Date,
    budget: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    touristSpots: [String],
    activities: [String],
    numberOfPersons: Number,
    numberOfDays: Number,
  },
  { timestamps: true }
);

const TravelPreference = mongoose.model("TravelPreference", travelPreferenceSchema);
export default TravelPreference;
