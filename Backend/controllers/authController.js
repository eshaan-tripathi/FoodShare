const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure dotenv is used to load environment variables

// Register Function
exports.register = async (req, res) => {
  try {
    console.log("hot sexy")
    const { name, email, password,address,phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log({name,phone,email,address});


    const user = new User({ name,phone, email, password: hashedPassword,address:address });
  
    await user.save();
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error( error.message);
    res.status(500).json({ error: "Server Error: " + error.message });
  }
};

// Login Function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Server Error: " + error.message });
  }
};
