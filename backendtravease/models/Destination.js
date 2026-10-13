import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  distance: String,
  days: Number,
  nights: Number,
  activities: [String],
  touristSpots: [String],
});
const Destination= mongoose.model('Destination', destinationSchema);

export default Destination;