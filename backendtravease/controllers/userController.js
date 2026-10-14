import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import transporter from '../utils/mailer.js';
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, redirectToLogin: true, message: 'User already exists.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashed });
    await newUser.save();

    

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to TravEase – Your Account is Ready',
      html: `
        <p>Hello ${firstName},</p>
        <p>Your account on TravEase has been created successfully!</p>
        <p><a href="http://localhost:3000/login/logininitial">Click here to login</a></p>
      `,
    });

    return res.status(201).json({ success: true, message: 'Registration successful. Check your email.' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

