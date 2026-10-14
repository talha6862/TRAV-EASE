import TourOperator from "../models/tourOperatorModel.js";
import Destination from "../models/Destination.js";
import { webPath } from '../utils/multer.js';
import transporter from '../utils/mailer.js';




export const registerTourOperator = async (req, res) => {
  try {
    const {
      operatorName,
      company,
      accountNumber,
      destinationName,
      email,
      phone,
      price,
      days,
      nights,
      touristSpots,
      vehicleTypes,
      accommodations,
      touristTypes,
      facilities,
      departures
    } = req.body;

    const imagePath = req.file ? webPath(req.file) : null;

    const parsedTouristSpots = JSON.parse(touristSpots || "[]");
    const parsedVehicleTypes = JSON.parse(vehicleTypes || "[]");
    const parsedAccommodations = JSON.parse(accommodations || "[]");
    const parsedTouristTypes = JSON.parse(touristTypes || "[]");
    const parsedFacilities = JSON.parse(facilities || "[]");
    const parsedDepartures = JSON.parse(departures || "[]");

    const validatedDepartures = parsedDepartures.map(dep => ({
      city: dep.city,
      singlePrice: Number(dep.singlePrice),
      couplePrice: Number(dep.couplePrice)
    }));

    const newOperator = new TourOperator({
      operatorName,
      company,
      accountNumber,
      destinationName,
      email,
      phone,
      price,
      days,
      nights,
      touristSpots: parsedTouristSpots,
      vehicleTypes: parsedVehicleTypes,
      accommodations: parsedAccommodations,
      touristTypes: parsedTouristTypes,
      facilities: parsedFacilities,
      departures: validatedDepartures,
      destinationImage: imagePath,
    });

    await newOperator.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Tour Operator Registration Received - Pending Approval",
      html: `
        <h3>Dear ${operatorName},</h3>
        <p>Thank you for registering as a Tour Operator with <strong>Trav-Ease.pk</strong>.</p>
        <p>Your tour package for <strong>${destinationName}</strong> has been received and is now pending admin verification.</p>
        <p>We will notify you as soon as your profile is approved.</p>
        <br />
        <p>Best regards,<br>Pak Tours Team</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Tour Operator registered successfully",
      data: newOperator,
    });
  } catch (err) {
    console.error("❌ Error in registerTourOperator:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to register tour operator",
      error: err.message,
    });
  }
};

export const getAllTourOperators = async (req, res) => {
  try {
    const tours = await TourOperator.find({ isVerified: true });
    res.status(200).json(tours);
  } catch (error) {
    console.error("Failed to retrieve tours", error);
    res.status(500).json({ message: "Failed to retrieve tours" });
  }
};

export const getTouristSpotsForDestination = async (req, res) => {
  try {
    const { destinationName } = req.params;
    const dest = await Destination.findOne({ name: destinationName });
    res.status(200).json(dest?.touristSpots || []);
  } catch (err) {
    console.error("Error fetching tourist spots:", err);
    res.status(500).json({ message: "Failed to get tourist spots" });
  }
};
