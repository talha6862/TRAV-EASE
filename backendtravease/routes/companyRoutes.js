import express from 'express';
import multer from 'multer';
import { registerCompany, getCompanies } from '../controllers/companyController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

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
