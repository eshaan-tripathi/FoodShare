const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const { editProfile, getUserProfile } = require("../controllers/userController");

// ✅ Correct usage of middleware
router.put("/:email/edit-profile", authenticate, upload.single("image"), editProfile);
router.get("/:email/edit-profile", authenticate, getUserProfile);

module.exports = router;
