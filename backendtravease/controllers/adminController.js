import Dealer from '../models/Dealer.js';
import Company from '../models/Company.js';
import TravelPreference from '../models/TravelPreference.js';
import Destination from '../models/Destination.js';
import TourOperator from '../models/tourOperatorModel.js'; 
import Feedback from '../models/Feedback.js';

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "talhaaslam6862@gmail.com",
    pass: "rdtcqdlwnyshilcd",
  },
});


export const getAllDealers = async (req, res) => {
  try {
    const dealers = await Dealer.find();
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dealers', error });
  }
};

export const approveDealer = async (req, res) => {
  const { id } = req.params;
  await Dealer.findByIdAndUpdate(id, { isVerified: true });
  res.json({ message: 'Dealer approved successfully' });
};

export const rejectDealer = async (req, res) => {
  try {
    const { id } = req.params;
    await Dealer.findByIdAndDelete(id);
    res.json({ message: 'Dealer rejected and removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting dealer', error });
  }
};

// ------------------- Company Management -------------------

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies', error });
  }
};

export const approveCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { isVerified: true },
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: 'Error verifying company' });
  }
};

export const rejectCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    res.json({ message: 'Company rejected and removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting company', error });
  }
};

export const getSingleCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch company' });
  }
};


export const getAllCustomizedTrips = async (req, res) => {
  try {
    const trips = await TravelPreference.find().populate("user", "firstName lastName email");
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error });
  }
};


export const deleteCustomizedTrip = async (req, res) => {
  try {
    const { id } = req.params;
    await TravelPreference.findByIdAndDelete(id);
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error });
  }
};


export const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching destinations', error });
  }
};

export const addDestination = async (req, res) => {
  try {
    console.log("📩 Body:", req.body);
    console.log("📷 File:", req.file);

    const { name, description, price, distance, days, nights } = req.body;
    const activities = JSON.parse(req.body.activities || "[]");
    const touristSpots = JSON.parse(req.body.touristSpots || "[]");
    const imagePath = req.file?.path;

    if (!name || !description || !imagePath) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newDestination = new Destination({
      name,
      description,
      image: imagePath,
      price,
      distance,
      days,
      nights,
      activities,
      touristSpots,
    });

    await newDestination.save();
    res.status(201).json({ message: "Destination added" });
  } catch (error) {
    console.error("❌ Failed to add destination:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    await Destination.findByIdAndDelete(id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting destination', error });
  }
};
export const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      distance,
      days,
      nights,
    } = req.body;

    const parseArray = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value.flat();
      return [value];
    };

    const activities = parseArray(req.body.activities);
    const touristSpots = parseArray(req.body.touristSpots);

    const updatedData = {
      name,
      description,
      price,
      distance,
      days,
      nights,
      activities,
      touristSpots,
    };

    if (req.file?.path) {
      updatedData.image = req.file.path;
    }

    const result = await Destination.findByIdAndUpdate(id, updatedData, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({ message: "Destination updated successfully", updatedDestination: result });
  } catch (error) {
    console.error("❌ Error updating destination:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};




export const getAllTourOperators = async (req, res) => {
  try {
    const operators = await TourOperator.find();
    res.json(operators);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operators', error });
  }
};

export const getSingleTourOperator = async (req, res) => {
  try {
    const operator = await TourOperator.findById(req.params.id);
    if (!operator) {
      return res.status(404).json({ message: 'Tour operator not found' });
    }
    res.json(operator);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operator', error });
  }
};

export const approveTourOperator = async (req, res) => {
  try {
    const operator = await TourOperator.findById(req.params.id);
    if (!operator) {
      return res.status(404).json({ message: 'Tour operator not found' });
    }

    operator.isVerified = true;
    await operator.save();

    await transporter.sendMail({
      from: "talhaaslam6862@gmail.com",
      to: operator.email,
      subject: "Your Tour Operator Account Has Been Verified",
      html: `
        <h3>Dear ${operator.operatorName},</h3>
        <p>🎉 Congratulations! Your tour package for <strong>${operator.destinationName}</strong> has been verified by the admin at <strong>Pak Tours</strong>.</p>
        <p>You can now actively manage and offer your tour services on our platform.</p>
        <p>Thank you for partnering with us.</p>
        <br />
        <p>Best regards,<br>Pak Tours Team</p>
      `,
    });

    res.json({ message: 'Tour operator verified successfully and email sent' });
  } catch (error) {
    console.error("Error verifying tour operator:", error);
    res.status(500).json({ message: 'Error verifying tour operator', error });
  }
};

export const deleteTourOperator = async (req, res) => {
  try {
    await TourOperator.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tour operator deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tour operator', error });
  }
};


export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 }); 
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
};

export const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete feedback" });
  }
};