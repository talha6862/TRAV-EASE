import express from 'express';
import { registerDealer, getAllDealers, verifyDealer } from '../controllers/dealerController.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'licenseImage', maxCount: 1 },
    { name: 'dealershipCertificate', maxCount: 1 },
  ]),
  registerDealer
);

router.get('/', getAllDealers);

router.patch('/verify/:id', verifyDealer);

export default router;
