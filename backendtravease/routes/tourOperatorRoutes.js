import express from 'express';
import { registerTourOperator, getAllTourOperators } from '../controllers/tourOperatorController.js';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/register-tour',
    upload.single('destinationImage'),
    registerTourOperator);
router.get('/all', getAllTourOperators);
// router.get('/:id', getSingleTourOperator);

export default router;
