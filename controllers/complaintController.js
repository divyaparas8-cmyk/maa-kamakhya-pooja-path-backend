const AsyncAwaitError = require('../middleware/AsyncAwaitError');
const Complaint = require('../models/complaintModel');

// Create New Complaint
exports.newComplaint = AsyncAwaitError(async (req, res, next) => {
    const { orderId, name, phone, email, issueType, description } = req.body;

    const complaint = await Complaint.create({
        orderId,
        name,
        phone,
        email,
        issueType,
        description
    });

    res.status(201).json({
        success: true,
        message: "Your complaint has been registered. We will contact you within 24 hours.",
        complaint
    });
});

// Get Single Complaint (For Tracking)
exports.getComplaint = AsyncAwaitError(async (req, res, next) => {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
        return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.status(200).json({
        success: true,
        complaint
    });
});
