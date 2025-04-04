const User = require("../models/User");
exports.profileSearch = async (req, res) => {
    try {
      console.log("Received Email Param:", req.params.email); // Debugging step
      const { email } = req.params;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
  
      const user = await User.findOne({ email: email.trim() }); // Trim whitespace
      console.log("User found:", user); // Debugging step
  
      if (!user) {
        return res.status(404).json({ error: "Profile not found" });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }