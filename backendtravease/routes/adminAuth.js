import express from "express";
import { registerAdmin, loginAdmin, getAllAdmins, approveAdmin } from "../controllers/adminAuthController.js";

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/adminlogin", loginAdmin);
router.get("/pending-admins", getAllAdmins);
router.put("/approve-admin/:id", approveAdmin);

export default router;
