import express from "express";
import {
  bookTrip,
  getTripsByEmail,
  getAllTrips,
  deleteTripById
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/", bookTrip);                  
router.get("/", getAllTrips);             
router.get("/:email", getTripsByEmail);    
router.delete("/:id", deleteTripById);       

export default router;
