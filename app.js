if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Register = require("./models/form.js");
const ejsMate = require("ejs-mate");

const app = express();
const port = process.env.PORT || 3001;
const MONGOOSE_URL = process.env.ATLASDB_URL || "mongodb://localhost:27017/hackathon";

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
        await mongoose.connect(MONGOOSE_URL, {
            // options can be added here if needed
        });
        console.log("Connected to Database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
}
main();

// HOST
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
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

        const { email1, email2, contact1, contact2, upiPaymentId, members, interest, ...otherFields } = req.body;

        // Validate required fields
        if (!email1) {
            return res.status(400).send("Email1 is required");
        }

        if (members == 2 && !email2) {
            return res.status(400).send("Email2 is required for two members");
        }

        if (!interest) {
            return res.status(400).send("Area of Interest is required.");
        }

        // Check for duplicate unique fields
        const [existingRegisterByEmail1, existingRegisterByEmail2, existingRegisterByContact1, existingRegisterByContact2, existingRegisterByPaymentId] = await Promise.all([
            Register.findOne({ email1 }),
            email2 ? Register.findOne({ email2 }) : null,
            Register.findOne({ contact1 }),
            contact2 ? Register.findOne({ contact2 }) : null,
            Register.findOne({ upiPaymentId })
        ]);

        if (existingRegisterByEmail1) {
            return res.status(400).send("Email1 is already registered.");
        }

        if (existingRegisterByEmail2) {
            return res.status(400).send("Email2 is already registered.");
        }

        if (existingRegisterByContact1) {
            return res.status(400).send("Contact number of member 1 is already registered.");
        }

        if (existingRegisterByContact2) {
            return res.status(400).send("Contact number of member 2 is already registered.");
        }

        if (existingRegisterByPaymentId) {
            return res.status(400).send("UPI Payment ID is already used.");
        }

        const newRegister = new Register({ email1, email2, contact1, contact2, upiPaymentId, members, interest, ...otherFields });
        await newRegister.save();
        res.status(200).send("Successfully registered!"); // Or redirect/render a success page
    } catch (error) {
        console.error("Error saving registration:", error);
        res.status(500).send("Error registering. Please try again.");
    }
});
