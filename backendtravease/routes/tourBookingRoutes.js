import express from "express";
import { bookTour, getToursByEmail } from "../controllers/tourBookingController.js";

const router = express.Router();

router.post("/", bookTour);
router.get("/:email", getToursByEmail);

export default router;
