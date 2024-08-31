// Adjust path if necessary
//console.log(Form); // Should print the Form model or details about it
const mongoose = require("mongoose");
const Form = require("./models/formModel"); // Adjust the path as necessary

mongoose
  .connect("mongodb://localhost/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");

    const testFormData = {
      /* fill with valid data according to your schema */
    };
    return Form.create(testFormData);
  })
  .then((result) => {
    console.log("Form created successfully:", result);
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error:", error);
    mongoose.disconnect();
  });
