const bcrypt = require("bcryptjs");
const User = require("../models/User");
const upload = require("../middleware/uploadMiddleware");
exports.editProfile = async (req, res) => {
    try {
      const { email } = req.params;
      if (req.user.email !== email)
        return res.status(403).json({ message: "Unauthorized" });
  
      const { name, phone, address, password } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      if (image) user.image = image;
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      await user.save();
      res.json({ message: "Profile updated successfully", image: user.image });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

  exports.getUserProfile = async (req, res) => {
    try {
      const { email } = req.params;
  
      if (req.user.email !== email) {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      const user = await User.findOne({ email }).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (err) {
      console.error("Fetch profile error:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  