const express = require('express');
const { newBooking, getSingleBooking, loggedInUserBookings } = require('../controllers/bookingController');
const { AuthenticateTheUser } = require('../middleware/AuthenticateTheUser');
const router = express.Router();

router.route("/booking/new").post(AuthenticateTheUser, newBooking);
router.route("/booking/:id").get(getSingleBooking); 
router.route("/bookings/me").get(AuthenticateTheUser, loggedInUserBookings);

module.exports = router;
