import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// Setup reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "talhaaslam6862@gmail.com",
    pass: "rdtcqdlwnyshilcd",
  },
});

export const registerAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ firstName, lastName, email, password: hashed });
    await newAdmin.save();

    // Notify the developer
    await transporter.sendMail({
      from: email,
      to: "talhaaslam6862@gmail.com",
      subject: "New Admin Registration Request",
      text: `Admin ${firstName} ${lastName} (${email}) has requested access to TravEase.`,
    });

    // Acknowledge the user
    await transporter.sendMail({
      from: "talhaaslam6862@gmail.com",
      to: email,
      subject: "TravEase Admin Request Received",
      text: `Dear ${firstName},\n\nYour request to become an admin on TravEase.pk has been received.\n\nOur team will review and approve your account shortly.\n\nThank you,\nTravEase Team`
    });

    res.status(200).json({ success: true, message: "Request sent for approval" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const approveAdmin = async (req, res) => {
  try {
    const approved = await Admin.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!approved) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const mailOptions = {
      from: "talhaaslam6862@gmail.com",
      to: approved.email,
      subject: "You are now an Admin of TravEase.pk",
      text: `Dear ${approved.firstName} ${approved.lastName},\n\nCongratulations! You have been approved as an admin on TravEase.pk.\n\nYou can now log in and access the admin panel at: https://travease.pk/adminlogin\n\nThank you,\nTravEase Team`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Admin approved and email sent", admin: approved });
  } catch (error) {
    res.status(500).json({ message: "Approval failed", error });
  }
};

export const getAllAdmins = async (req, res) => {
  const admins = await Admin.find({ isApproved: false });
  res.json(admins);
};

export const loginAdmin = async (req, res) => {
  const SUPER_ADMIN_EMAIL = "talhaaslam6862@gmail.com";
  const SUPER_ADMIN_PASSWORD = "talha2024";
  const { email, password } = req.body;

  try {
    // Super admin login (hardcoded)
    if (email === SUPER_ADMIN_EMAIL) {
      if (password === SUPER_ADMIN_PASSWORD) {
        return res.status(200).json({
          success: true,
          user: {
            firstName: "Super",
            lastName: "Admin",
            email: SUPER_ADMIN_EMAIL,
            role: "superadmin"
          }
        });
      } else {
        return res.status(401).json({ success: false, message: "Invalid password" });
      }
    }

    // Regular admin login
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid password" });

    if (!admin.isApproved) {
      return res.status(403).json({ success: false, message: "Admin not yet approved" });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: admin._id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: "admin"
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Login error", error: err.message });
  }
};
