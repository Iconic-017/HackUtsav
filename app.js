const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Register = require("./models/form.js");

let host = 3001;
let MONGOOSE_URL = "mongodb://127.0.0.1:27017/hackathon";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
const ejsMate = require("ejs-mate")
app.engine('ejs' , ejsMate);

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
app.post("/HackUtsav/Registration", async (req, res) => {
    try {
        const newRegister = new Register(req.body.register);

        // Validate if upiPaymentId is unique before saving
        const existingRegister = await Register.findOne({ upiPaymentId: newRegister.upiPaymentId });
        if (existingRegister) {
            alert("Payment Id must be unique");
        } else {
            await newRegister.save();
            alert("regitration done");
            res.redirect("/HackUtsav");
        }

        
    } catch (error) {
        console.error("Error saving registration:", error);
        res.status(500).send("Error registering. Please try again.");
    }
});
