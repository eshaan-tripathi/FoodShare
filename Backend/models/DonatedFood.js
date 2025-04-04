const mongoose = require("mongoose");

const donatedfoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: false },
    location: { type: String, required: true },
    image: {
      type: String,
      required: false,
      default: "https://via.placeholder.com/150",
    },
    donorDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    donorName: { type: String, required: false },
    postedAt: {
      type: String,
      default: function () {
        return new Date().toLocaleString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      },
    },
    donorContactNo: { type: String, required: false },
    status: {
      type: String,
      
      default: "Donated",
    },
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    claimedAt: { type: Date },
    latitude: {type:String},
    longitude: {type:String},
    emailid: {
      type:String
   },claimerEmail: { type: String ,default:null},
   claimerName: { type: String ,default:null},
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("DonatedFood", donatedfoodSchema);
