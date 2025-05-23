const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFood,
  getAvailableFood,
  claimFood,
  getDonatedFood,
  getClaimedFood,
} = require("../controllers/foodController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = multer();
router.post("/add",authMiddleware,upload.none(), addFood);
router.get("/available", getAvailableFood);
router.post("/claim/:id", authMiddleware,claimFood);
router.get("/donated/:email", authMiddleware, getDonatedFood);
router.get("/claimed/:email", authMiddleware, getClaimedFood);
router.put("/claim/:id", authMiddleware, claimFood);
module.exports = router;

