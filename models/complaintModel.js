const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  issueType: {
    type: String,
    enum: [
      "Prasad Not Received",
      "Wrong Prasad Received", 
      "Damaged Prasad",
      "Other"
    ],
    required: true
  },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "in_progress", "resolved"],
    default: "open"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", complaintSchema);
