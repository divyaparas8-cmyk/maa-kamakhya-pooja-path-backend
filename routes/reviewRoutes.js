const express = require("express");
const { createReview, getReviews } = require("../controllers/reviewController");

const router = express.Router();

// POST - Add Review
router.post("/user-review", createReview);

// GET - Fetch Reviews
router.get("/user-review", getReviews);

module.exports = router;
