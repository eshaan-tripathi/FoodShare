
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// ✅ Random password generator
const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8); // e.g. "a1b2c3d4"
};

// ✅ Email config (use ethereal or your SMTP)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail or SMTP
    pass: process.env.EMAIL_PASS,
  },
});

exports.resetPassController =  async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found with this email" });

    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    // ✅ Send the new password to user's email
    await transporter.sendMail({
      from: '"Food Sharing App" <no-reply@foodshare.com>',
      to: email,
      subject: "Your New Password",
      html: `
        <p>Hello ${user.name || "User"},</p>
        <p>You requested a new password. Here's your new temporary password:</p>
        <h3 style="color: #4f46e5;">${newPassword}</h3>
        <p>Please log in and change your password immediately.</p>
        <br />
        <p>Best regards,</p>
        <p>Food Sharing Team</p>
      `,
    });

    return res.status(200).json({ message: "New password sent to your email." });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

