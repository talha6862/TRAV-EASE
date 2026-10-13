// routes/paymentRoutes.js
import express from "express";
import {
  createPaymentIntent,
  savePayment,
  getToursByEmail
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.post("/save-payment", savePayment);
router.get("/:email", getToursByEmail);

export default router;
