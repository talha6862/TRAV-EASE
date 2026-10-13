import express from "express";
import { createTravelPreference, getAllPreferences, getPreferencesByEmail } from "../controllers/travelPreferenceController.js";

const router = express.Router();

router.post("/", createTravelPreference);      
router.get("/", getAllPreferences);             

router.get("/:email", getPreferencesByEmail);


export default router;
