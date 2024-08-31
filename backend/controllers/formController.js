const Form = require("../models/formModel");
exports.submitForm = async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Request body:", req.body); // Log the incoming request body

  // Check if any required fields are missing
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create and save a new Form document
    const newForm = new Form({ name, email, message });
    await newForm.save();

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error submitting form:", err);
    res
      .status(500)
      .json({ message: "Error submitting form", error: err.message });
  }
};
