import express from 'express';
import upload from '../utils/multer.js';
import { registerTourOperator, getAllTourOperators } from '../controllers/tourOperatorController.js';
const router = express.Router();

router.post('/register-tour',
    upload.single('destinationImage'),
    registerTourOperator);
router.get('/all', getAllTourOperators);
// router.get('/:id', getSingleTourOperator);

export default router;
