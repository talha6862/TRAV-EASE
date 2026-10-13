import express from 'express';
import {
  getAllDealers,
  approveDealer,
  rejectDealer,
  getAllCompanies,
  rejectCompany,
  approveCompany,
  getSingleCompany,
  getAllCustomizedTrips,
  deleteCustomizedTrip,
  getAllDestinations,
  addDestination,
  deleteDestination,
  updateDestination,
  getAllTourOperators,
  getSingleTourOperator,
  approveTourOperator,
  deleteTourOperator,
  getAllFeedbacks,
  deleteFeedback
} from '../controllers/adminController.js';

import multer from 'multer'; 

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const router = express.Router();

// ---------------- Dealers ----------------
router.get('/dealers', getAllDealers);
router.put('/dealers/:id/approve', approveDealer);
router.delete('/dealers/:id/reject', rejectDealer);

// ---------------- Companies ----------------
router.get('/companies', getAllCompanies);
router.get('/companies/:id', getSingleCompany); 
router.put('/companies/:id/approve', approveCompany);
router.delete('/companies/:id/reject', rejectCompany);

// ---------------- Customized Trips ----------------
router.get('/trips', getAllCustomizedTrips);
router.delete('/trips/:id', deleteCustomizedTrip);

// ---------------- Destinations ----------------
router.get('/destinations', getAllDestinations);
router.post('/destinations', upload.single('image'), addDestination);
router.delete('/destinations/:id', deleteDestination);
router.put('/destinations/:id', upload.single('image'), updateDestination);

// ---------------- Tour Operators ----------------
router.get('/tour-operators', getAllTourOperators);
router.get('/tour-operators/:id', getSingleTourOperator);
router.put('/tour-operators/:id/approve', approveTourOperator);
router.delete('/tour-operators/:id', deleteTourOperator);

router.get('/feedbacks', getAllFeedbacks);
router.delete("/feedbacks/:id", deleteFeedback);


export default router;
