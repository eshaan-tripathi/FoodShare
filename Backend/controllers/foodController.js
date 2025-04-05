const Food = require("../models/Food");
const User = require("../models/User");
const claimed = require('../models/ClaimedFood');
const ClaimedFood = require("../models/ClaimedFood");
const DonatedFood = require("../models/DonatedFood");
const nodemailer = require('nodemailer');

exports.addFood = async (req, res) => {
  try {
    const { foodName, category, quantity, location, phone,latitude,longitude } = req.body;

    const { email, name } = req.user;
   
    const foodData = {
      name: foodName,
      category: category,
      quantity: quantity,
      location: location,
      donorDetails: req.user.userId, 
      donorName: name,
      donorContactNo: phone,  
      latitude: latitude,
      longitude: longitude,
      emailid :email
    }
    const food = new Food(foodData);
    const donatefood = new DonatedFood(foodData);
    await donatefood.save();
    await food.save();
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { donated: { foodItemId: food._id } },
    });
    
    res.status(201).json({ message: "Food added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getClaimedFood = async (req, res) => {
  try {
    const { email } = req.params;

    // Find all food items where `emailid` matches the requested email
    const claimedFood = await ClaimedFood.find({ emailid: email })
      .select("name category quantity location image donorName donorContactNo status claimedAt latitude longitude donorDetails")
      .populate("donorDetails", "name email phone") // 👈 Add this line to get donor info
      .exec();

    console.log(claimedFood);

    if (!claimedFood || claimedFood.length === 0) {
      return res.status(404).json({ message: "No claimed food found for this email." });
    }

    res.json(claimedFood); // Send claimed food as response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






exports.getAvailableFood = async (req, res) => {
  try {
    const foodItems = await Food.find({ status: "Available" }).populate("donorDetails"); // Fetch all donor details
    res.json(foodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Ensure you import the Food model

exports.claimFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) return res.status(404).json({ message: "Food item not found" });
    const user = await User.findById(req.user.userId);

    console.log(user.name);
    const claimerEmail = user.email;
    const claimerName = user.name;

    const claimerPhone = user.phone;
    const claimerAddress = user.address;
    
    const claimedFood = new claimed({
      name: food.name,
      category: food.category,
      quantity: food.quantity,
      location: food.location,
      image: food.image,
      donorDetails: food.donorDetails,
      donorName: food.donorName,
      donorContactNo: food.donorContactNo,
      latitude: food.latitude,
      longitude: food.longitude,
      emailid: claimerEmail, // Store claimer's email
      claimerName:claimerName,
      status: "Claimed",
     
      claimedAt: new Date()
    });

    await claimedFood.save(); // Save to ClaimedFood collection
    await Food.findByIdAndDelete(id); // Remove from AvailableFood collection

    // 🔥 Update matching DonatedFood record (same food name + donor ID + status still "Donated")
    await DonatedFood.findOneAndUpdate(
      {
        name: food.name,
        
        donorDetails: food.donorDetails,
        status: "Donated"
      },
      {
        $set: {
          status: "Claimed",
          claimerName: claimerName,
          claimedAt: new Date(),
          claimerEmail: claimerEmail // Add this field to your schema if you want
        }
      }
    );
   
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or any SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    const mailOptions = {
      from: `"Food Share App" <${process.env.EMAIL_USER}>`,
      to: food.emailid,
      subject: "Your food has been claimed!",
      html: `
        <h3>Food Claimed: ${food.name}</h3>
        <p><strong>Claimer Name:</strong> ${claimerName}</p>
        <p><strong>Email:</strong> ${claimerEmail}</p>
        <p><strong>Phone:</strong> ${claimerPhone}</p>
        <p><strong>Location:</strong> ${claimerAddress}</p>
        <hr>
        <p>Please coordinate the pickup/delivery. Thank you for donating!</p>
      `,
    };
    console.log(process.env.EMAIL_USER)
    console.log(process.env.EMAIL_PASS)
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully!");
    } catch (emailErr) {
      console.error("❌ Failed to send email:", emailErr);
      return res.status(500).json({
        message: "Error sending email",
        error: emailErr.message,
      });
    }
    res.status(200).json({ message: "Food claimed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error claiming food", error: error.message });
  }
};




exports.getDonatedFood = async (req, res) => {
  try {
    const { email } = req.params;

    // Find all food items where `emailid` matches the donor's email
    const donatedFood = await DonatedFood.find({ emailid: email }).select(
      "name category quantity location image status donorName donorContactNo latitude longitude createdAt claimerEmail claimerName"
    );
     console.log(donatedFood)
    if (!donatedFood || donatedFood.length === 0) {
      return res.status(404).json({ message: "No donated food found for this email." });
    }

    res.json(donatedFood); // Send donated food as response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};