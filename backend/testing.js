const mongoose = require("mongoose");
const formModel = require("./models/formModel"); // Adjust the path based on your project structure

// MongoDB connection setup
mongoose
  .connect("mongodb://localhost:27017/PortfolioWebsite", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");

    // Data to be saved
    const data = {
      name: "John Doe",
      email: "john@example.com",
      message: "Hello World",
    };

    // Create a new document
    const newDocument = new formModel(data);

    // Save the document to the database
    newDocument
      .save()
      .then(() => console.log("Document saved successfully"))
      .catch((err) => {
        console.error("Error saving document:", err);
        if (err.name === "ValidationError") {
          console.error("Validation failed:", err.errors);
        }
      });
  })
  .catch((err) => console.error("Database connection error:", err));
