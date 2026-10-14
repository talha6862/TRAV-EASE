import express from 'express';
import upload from '../utils/multer.js';
import { registerCompany, getCompanies } from '../controllers/companyController.js';

const router = express.Router();

router.post(
  '/register',
  upload.fields([
    { name: 'registrationCertificate', maxCount: 1 },
    { name: 'nationalId', maxCount: 1 },
  ]),
  registerCompany
);

router.get('/companies', getCompanies);

export default router;
