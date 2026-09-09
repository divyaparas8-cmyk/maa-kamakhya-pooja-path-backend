const AsyncAwaitError = require('../middleware/AsyncAwaitError');
const Booking = require('../models/bookingModel');

// Create New Booking
exports.newBooking = AsyncAwaitError(async (req, res, next) => {
    const {
        pujaName,
        pujaPackage,
        pujaPrice,
        devoteeNames,
        gotra,
        wish,
        specialInstructions,
        offerings,
        offeringsTotal,
        deliveryType,
        deliveryAddress,
        deliveryCharge,
        totalAmount,
        paymentStatus
    } = req.body;

    const booking = await Booking.create({
        user: req.ourUser ? req.ourUser._id : req.body.userId, // Fallback if auth middleware is not applied globally
        pujaName,
        pujaPackage,
        pujaPrice,
        devoteeNames,
        gotra,
        wish,
        specialInstructions,
        offerings,
        offeringsTotal,
        deliveryType,
        deliveryAddress,
        deliveryCharge,
        totalAmount,
        paymentStatus
    });

    res.status(201).json({
        success: true,
        message: "New Booking Created",
        booking
    });
});

// Get Single Booking
exports.getSingleBooking = AsyncAwaitError(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate("user", "name email");

    if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
        success: true,
        booking
    });
});

// Get Logged In User Bookings
exports.loggedInUserBookings = AsyncAwaitError(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.ourUser._id });

    res.status(200).json({
        success: true,
        bookings
    });
});
