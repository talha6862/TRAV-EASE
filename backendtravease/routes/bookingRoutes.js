import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingsByEmail,
  deleteBooking
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/create', createBooking);
router.get('/', getAllBookings);               
router.get('/:email', getBookingsByEmail);     
router.delete('/:id', deleteBooking);         

export default router;
