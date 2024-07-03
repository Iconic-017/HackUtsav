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
    res.render("index");
});

app.get("/HackUtsav/Registration", (req, res) => {
    res.render("new");
});

// REGISTRATION AND PAYMENT ROUTE
app.post("/HackUtsav/Registration", async (req, res) => {
    try {
        const newRegister = new Register(req.body.register);

        // Validate if upiPaymentId is unique before saving
        const existingRegister = await Register.findOne({ upiPaymentId: newRegister.upiPaymentId });
        if (existingRegister) {
            return res.status(400).send("Payment Id must be unique");
        } else {
            await newRegister.save();
            res.redirect("/HackUtsav");
        }
    } catch (error) {
        console.error("Error saving registration:", error);
        res.status(500).send("Error registering. Please try again.");
    }
});
