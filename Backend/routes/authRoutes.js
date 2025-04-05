const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const multer = require("multer");
const path = require("path");
const { resetPassController } = require("../controllers/resetPassController");

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure the uploads/ folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Routes
router.post("/register", upload.single("image"), register); // image comes as 'image'
router.post("/login", login);
router.post("/forgot-password",resetPassController);
module.exports = router;
