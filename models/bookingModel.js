const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  pujaName: { type: String, required: true },
  pujaPackage: { type: String, required: true },
  pujaPrice: { type: Number, required: true },
  devoteeNames: { type: String, required: true },
  gotra: { type: String, required: true },
  wish: { type: String },
  specialInstructions: { type: String },
  offerings: [
    {
      name: { type: String },
      price: { type: Number }
    }
  ],
  offeringsTotal: { type: Number, default: 0 },
  deliveryType: {
    type: String,
    enum: ["home_delivery", "no_delivery"],
    required: true
  },
  deliveryAddress: {
    fullName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String
  },
  deliveryCharge: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  bookingStatus: {
    type: String,
    enum: [
      "confirmed",
      "puja_scheduled", 
      "puja_performed",
      "prasad_packed",
      "shipped",
      "delivered"
    ],
    default: "confirmed"
  },
  trackingNumber: { type: String },
  courierName: { type: String },
  bookingId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate bookingId like "MKP-2024-XXXX" before saving
bookingSchema.pre("save", function (next) {
  if (!this.bookingId) {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
    this.bookingId = `MKP-${year}-${randomNum}`;
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
