const express = require('express');
const { newComplaint, getComplaint } = require('../controllers/complaintController');
const router = express.Router();

router.route("/complaint/new").post(newComplaint);
router.route("/complaint/:id").get(getComplaint);

module.exports = router;
