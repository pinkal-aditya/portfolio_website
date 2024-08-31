const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

// POST route to handle form submission
router.post("/submit", formController.submitForm);

module.exports = router;
