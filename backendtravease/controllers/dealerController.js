import Dealer from '../models/Dealer.js';
import { webPath } from '../utils/multer.js';

export const registerDealer = async (req, res) => {
  try {
    const {
      dealerName,
      companyName,
      phoneNumber, 
      email,
      businessAddress,
      city, 
      chassisNumber,
      vehicleType,
      carModel,
      minPrice,
      maxPrice,
    } = req.body;

    const licenseImage = webPath(req.files?.licenseImage?.[0]);
    const dealershipCertificate = webPath(req.files?.dealershipCertificate?.[0]);

    const newDealer = new Dealer({
      dealerName,
      companyName,
      phoneNumber,
      email,
      businessAddress,
      city,
      chassisNumber,
      vehicleType,
      carModel,
      minPrice,
      maxPrice,
      licenseImage,
      dealershipCertificate,
    });

    await newDealer.save();
    res.status(201).json({ message: 'Dealer information saved successfully!' });

  } catch (error) {
    console.error('Dealer save error:', error);
    res.status(500).json({ message: 'Error saving dealer information' });
  }
};

export const getAllDealers = async (req, res) => {
  try {
    const dealers = await Dealer.find().sort({ createdAt: -1 });
    res.status(200).json(dealers);
  } catch (error) {
    console.error("Error fetching dealers:", error);
    res.status(500).json({ message: "Error fetching dealers" });
  }
};

export const verifyDealer = async (req, res) => {
  try {
    const { id } = req.params;
    await Dealer.findByIdAndUpdate(id, { isVerified: true });
    res.status(200).json({ message: "Dealer verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying dealer" });
  }
};
