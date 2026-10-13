import Trip from "../models/Trip.js";

export const bookTrip = async (req, res) => {
  try {
    const {
      name, destination, description, image,
      price, originalPrice, totalPrice, persons,
      email, departureCity, selectedFacilities,
      selectedSpots, distanceFromCity
    } = req.body;

    const trip = new Trip({
      name,
      destination,
      description,
      image,
      price,
      originalPrice,
      totalPrice,
      persons,
      email,
      departureCity,
      selectedFacilities,
      selectedSpots,
      distanceFromCity
    });

    await trip.save();
    res.status(201).json({ message: "Trip booked successfully", data: trip });
  } catch (err) {
    res.status(500).json({ message: "Error booking trip", error: err.message });
  }
};

export const getTripsByEmail = async (req, res) => {
  try {
    const trips = await Trip.find({ email: req.params.email });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips", error });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all trips", error });
  }
};

export const deleteTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Trip.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({ message: "Trip deleted successfully", data: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting trip", error });
  }
};
