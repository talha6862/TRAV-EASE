import TourBooking from "../models/TourBooking.js";

export const bookTour = async (req, res) => {
  try {
    console.log("➡️ Booking data received:", req.body); 

    const booking = new TourBooking(req.body);
    await booking.save();

    res.status(201).json({ message: "Tour booked successfully" });
  } catch (err) {
    console.error("❌ Error booking tour:", err.message);
    res.status(500).json({ message: "Error booking tour", error: err.message });
  }
};


export const getToursByEmail = async (req, res) => {
  try {
    const bookings = await TourBooking.find({ bookedBy: req.params.email });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tour bookings", error: err });
  }
};
