import mongoose from 'mongoose';

const dealerSchema = new mongoose.Schema({
  dealerName: String,
  companyName: String,
  phoneNumber: String,
  email: String,
  businessAddress: String, 
  city: String,
  licenseImage: String,
  chassisNumber: String,
  vehicleType: String,
  carModel: String,
  minPrice: Number,
  maxPrice: Number,
  dealershipCertificate: String,
  isVerified: { type: Boolean, default: false }
});


const Dealer = mongoose.model('Dealer', dealerSchema);
export default Dealer;