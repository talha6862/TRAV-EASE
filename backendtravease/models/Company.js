import mongoose from 'mongoose';

const companySchema = new mongoose.Schema( {
    ownerName: { type: String, required: true },
    companyName: { type: String, required: true },
    businessAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true },

    registrationCertificate: { type: String, required: true },
    nationalId: { type: String, required: true },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);
export default Company;
