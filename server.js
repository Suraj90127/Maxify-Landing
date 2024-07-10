const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://maxifywebsolutions:Maxify%40123@cluster0.ffjnxvs.mongodb.net/landingpageaData",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Check connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Failed to connect to MongoDB", err);
});

// Define Schema
const contactSchema = new mongoose.Schema({
  contactName: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  postcode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  idea: { type: String, required: true },
  nda: { type: Boolean, required: false },
});

// Create Model
const Contact = mongoose.model("Contact", contactSchema);

// Define API route
app.post("/api/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact", error });
  }
});

// Serve the index.html file for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
