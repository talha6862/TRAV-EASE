import Stripe from "stripe";
import Payment from "../models/Payment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, email, destinationName } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "pkr",
      metadata: { email, destinationName },
    });

    res.status(200).json(paymentIntent.client_secret);
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ message: "Payment intent creation failed" });
  }
};

export const savePayment = async (req, res) => {
  try {
    const {
      email,
      fullName,
      amount,
      destinationName,
      paymentIntentId,
      accountNumber,
      operatorName,
      company,
      duration,
      touristCounts,
      selectedDeparture,
      selectedSpots,
      selectedAccommodations,
      selectedActivities,
    } = req.body;

    const payment = new Payment({
      email,
      fullName,
      amount,
      destinationName,
      paymentIntentId,
      accountNumber,
      operatorName,
      company,
      duration,
      touristCounts,
      selectedDeparture,
      selectedSpots,
      selectedAccommodations,
      selectedActivities,
    });

    await payment.save();
    res.status(200).json({ message: "✅ Tour booking & payment saved successfully!" });
  } catch (error) {
    console.error("Save Payment Error:", error.message);
    res.status(500).json({ message: "❌ Failed to save tour booking", error: error.message });
  }
};

export const getToursByEmail = async (req, res) => {
  try {
    const tours = await Payment.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booked tours", error: error.message });
  }
};
