import Feedback from "../models/Feedback.js";
import transporter from '../utils/mailer.js';
export const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

    

    const mailOptions = {
      from: email,
      to: process.env.ADMIN_NOTIFY_EMAIL || process.env.EMAIL_USER,             
      subject: `📩 New Contact Message from ${name}`,
      text: `You received a message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Feedback submitted and emailed successfully" });
  } catch (err) {
    console.error("Error in submitFeedback:", err);
    res.status(500).json({ error: "Failed to submit feedback or send email" });
  }
};
