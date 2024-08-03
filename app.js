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

app.post("/HackUtsav", async (req, res) => {
    try {
        console.log(req.body);  // Log the request body for debugging

        const { name1, email1, contact1, name2, email2, contact2, name3, email3, contact3, upiPaymentId, members, interest, ...otherFields } = req.body;

        // Validate required fields
        if (!email1) {
            return res.status(400).send("Email1 is required");
        }

        if (members == 2 && (!email2 || !contact2)) {
            return res.status(400).send("Email2 and Contact2 are required for two members");
        }

        if (members == 3 && (!email3 || !contact3)) {
            return res.status(400).send("Email3 and Contact3 are required for three members");
        }

        if (!interest) {
            return res.status(400).send("Area of Interest is required.");
        }

        // Filter out empty fields for optional members
        const memberData = {
            member1: { name: name1, email: email1, contact: contact1 },
            upiPaymentId,
            members,
            interest,
            ...otherFields
        };

        if (members >= 2) {
            memberData.member2 = { name: name2, email: email2, contact: contact2 };
        }
        if (members == 3) {
            memberData.member3 = { name: name3, email: email3, contact: contact3 };
        }

        // Check for duplicate unique fields
        const [existingRegisterByEmail1, existingRegisterByEmail2, existingRegisterByContact1, existingRegisterByContact2, existingRegisterByPaymentId] = await Promise.all([
            Register.findOne({ 'member1.email': email1 }),
            email2 ? Register.findOne({ 'member2.email': email2 }) : null,
            Register.findOne({ 'member1.contact': contact1 }),
            contact2 ? Register.findOne({ 'member2.contact': contact2 }) : null,
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

        // Save the new registration data
        const newRegister = new Register(memberData);

        await newRegister.save();
        // res.status(200).send("Successfully registered!"); // Or redirect/render a success page
        res.status(200).render("success.ejs");
    } catch (error) {
        console.error("Error saving registration:", error);
        res.status(500).send("Error registering. Please try again.");
    }
});