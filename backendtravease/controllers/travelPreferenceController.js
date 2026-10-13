import TravelPreference from "../models/TravelPreference.js";
import User from "../models/userModel.js";
export const createTravelPreference = async (req, res) => {
  try {
    const {
      destination,
      travelDate,
      budget,
      email,
      touristSpots,
      activities,
      numberOfPersons,
      numberOfDays,
    } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPreference = new TravelPreference({
      destination,
      travelDate,
      budget,
      user: foundUser._id,
      touristSpots,
      activities,
      numberOfPersons,
      numberOfDays,
    });

    await newPreference.save();
    res.status(201).json({ message: "Travel preference saved successfully!" });
  } catch (error) {
    console.error("Error saving travel preference:", error);
    res.status(500).json({ error: "Failed to save travel preference" });
  }
};


export const getAllPreferences = async (req, res) => {
  try {
    const preferences = await TravelPreference.find();
    res.status(200).json(preferences);
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
};

export const getPreferencesByEmail = async (req, res) => {
  try {
    const preferences = await TravelPreference.find({ email: req.params.email });
    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};
