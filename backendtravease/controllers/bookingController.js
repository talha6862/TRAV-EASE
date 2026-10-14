import Booking from "../models/bookingModel.js";
import axios from "axios";

export const createBooking = async (req, res) => {
  try {
    console.log("Incoming booking:", req.body);

    const {
      destinationName,
      departureCity,
      touristSpots,
      accommodations,
      facilities,
      activities,
      couples,
      males,
      females,
      singlePrice,
      couplePrice,
      bookedBy,
    } = req.body;

    if (!departureCity || !destinationName) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const geoRes = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
      params: {
        q: `${departureCity}, Pakistan`,
        key: process.env.OPENCAGE_API_KEY,
      },
    });

    const location = geoRes.data.results[0];
    const coords = location.geometry || {};
    const dist = location.annotations?.distance?.value;

    const single = parseInt(singlePrice) || 0;
    const couple = parseInt(couplePrice) || 0;

    const totalPrice = (males + females) * single + couples * couple;

    const newBooking = new Booking({
      destinationName,
      departureCity,
      touristSpots,
      accommodations,
      facilities,
      activities,
      couples,
      males,
      females,
      totalPrice,
      bookedBy,
      distance: dist ? `${dist} km` : "Unknown",
    });

    await newBooking.save();

    res.status(201).json({ success: true, message: "Booking successful", data: newBooking });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ success: false, message: "Booking failed", error: err.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch bookings", error: err.message });
  }
};

export const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ bookedBy: email });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch user bookings", error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, message: "Booking deleted successfully", data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete booking", error: err.message });
  }
};
