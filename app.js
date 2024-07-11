const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Register = require("./models/form.js");
const ejsMate = require("ejs-mate");

let host = 3001;
let MONGOOSE_URL = "mongodb://127.0.0.1:27017/hackathon";

// Set up EJS as the view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(MONGOOSE_URL);
        console.log("Connected to Database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1); // Exit the process on connection error
    }
}
main();

// HOST
app.listen(host, () => {
    console.log("Server running on port:", host);
});

// MAIN ROUTE
app.get("/HackUtsav", (req, res) => {
    res.render("index.ejs");
});

app.get("/HackUtsav/Registration", (req, res) => {
    res.render("new.ejs");
});

// REGISTRATION AND PAYMENT ROUTE
app.post("/HackUtsav", async (req, res) => {
    try {
        console.log(req.body);  // Log the request body for debugging

        const { email1, email2, contact1, upiPaymentId, ...otherFields } = req.body;

        // Validate required fields
        if (!email1) {
            return res.status(400).send("Email1 is required");
        }

        if (otherFields.members == 2 && !email2) {
            return res.status(400).send("Email2 is required for two members");
        }

        // Check for duplicate unique fields
        const existingRegisterByEmail1 = await Register.findOne({ email1 });
        const existingRegisterByEmail2 = email2 ? await Register.findOne({ email2 }) : null;
        const existingRegisterByContact1 = await Register.findOne({ contact1 });
        const existingRegisterByPaymentId = await Register.findOne({ upiPaymentId });

        if (existingRegisterByEmail1 || existingRegisterByEmail2 || existingRegisterByContact1 || existingRegisterByPaymentId) {
            return res.status(400).send("Duplicate key error: Ensure that email, contact, and payment ID are unique.");
        }

        const newRegister = new Register({ email1, email2, contact1, upiPaymentId, ...otherFields });
        await newRegister.save();
        res.status(200).send("Successfully registered!");
    } catch (error) {
        console.error("Error saving registration:", error);
        res.status(500).send("Error registering. Please try again.");
    }
});
