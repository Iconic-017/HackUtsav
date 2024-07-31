// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const Register = require("./models/form.js");
// const ejsMate = require("ejs-mate");

// const app = express();
// const port = process.env.PORT || 3001;
// const MONGOOSE_URL = process.env.ATLASDB_URL || "mongodb://localhost:27017/hackathon";

// // Set up EJS as the view engine
// app.engine("ejs", ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Serve static files from the public directory
// app.use(express.static(path.join(__dirname, "public")));

// // Middleware to parse the request body
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// async function main() {
//     try {
//         await mongoose.connect(MONGOOSE_URL, {
//         });
//         console.log("Connected to Database");
//     } catch (error) {
//         console.error("Error connecting to database:", error);
//         process.exit(1);
//     }
// }
// main();

// // HOST
// app.listen(port, () => {
//     console.log(`Server running on port: ${port}`);
// });

// // MAIN ROUTE
// app.get("/HackUtsav", (req, res) => {
//     res.render("index.ejs");
// });

// app.get("/HackUtsav/Registration", (req, res) => {
//     res.render("new.ejs");
// });

// // REGISTRATION AND PAYMENT ROUTE
// app.post("/HackUtsav", async (req, res) => {
//     try {
//         console.log(req.body);  // Log the request body for debugging

//         const { email1, email2, contact1, contact2, upiPaymentId, members, ...otherFields } = req.body;

//         // Validate required fields
//         if (!email1) {
//             return res.status(400).send("Email1 is required");
//         }

//         if (members == 2 && !email2) {
//             return res.status(400).send("Email2 is required for two members");
//         }

//         // Check for duplicate unique fields
//         const [existingRegisterByEmail1, existingRegisterByEmail2, existingRegisterByContact1, existingRegisterByContact2, existingRegisterByPaymentId] = await Promise.all([
//             Register.findOne({ email1 }),
//             email2 ? Register.findOne({ email2 }) : null,
//             Register.findOne({ contact1 }),
//             contact2 ? Register.findOne({ contact2 }) : null,
//             Register.findOne({ upiPaymentId })
//         ]);

//         if (existingRegisterByEmail1) {
//             return res.status(400).send("Email1 is already registered.");
//         }

//         if (existingRegisterByEmail2) {
//             return res.status(400).send("Email2 is already registered.");
//         }

//         if (existingRegisterByContact1) {
//             return res.status(400).send("Contact number of member 1 is already registered.");
//         }

//         if (existingRegisterByContact2) {
//             return res.status(400).send("Contact number of member 2 is already registered.");
//         }

//         if (existingRegisterByPaymentId) {
//             return res.status(400).send("UPI Payment ID is already used.");
//         }

//         const newRegister = new Register({ email1, email2, contact1, contact2, upiPaymentId, members, ...otherFields });
//         await newRegister.save();
//         res.status(200).send("Successfully registered!"); // Or redirect/render a success page
//     } catch (error) {
//         console.error("Error saving registration:", error);
//         res.status(500).send("Error registering. Please try again.");
//     }
// });


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
const MONGOOSE_URL = process.env.ATLASDB_URL;

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

        const { members, teamname, college, collegeId, branch, name1, email1, contact1, name2, email2, contact2, name3, email3, contact3, upiPaymentId } = req.body;

        // Validate required fields
        if (!email1) {
            return res.status(400).send("Email of member 1 is required");
        }

        if (members == 2 && (!email2 || !contact2)) {
            return res.status(400).send("Email and Contact of member 2 are required for two members");
        }

        if (members == 3 && (!email3 || !contact3)) {
            return res.status(400).send("Email and Contact of member 3 are required for three members");
        }

        // Check for duplicate unique fields
        const [existingRegisterByEmail1, existingRegisterByEmail2, existingRegisterByEmail3, existingRegisterByContact1, existingRegisterByContact2, existingRegisterByContact3, existingRegisterByPaymentId] = await Promise.all([
            Register.findOne({ 'member1.email': email1 }),
            email2 ? Register.findOne({ 'member2.email': email2 }) : null,
            email3 ? Register.findOne({ 'member3.email': email3 }) : null,
            Register.findOne({ 'member1.contact': contact1 }),
            contact2 ? Register.findOne({ 'member2.contact': contact2 }) : null,
            contact3 ? Register.findOne({ 'member3.contact': contact3 }) : null,
            Register.findOne({ upiPaymentId })
        ]);

        if (existingRegisterByEmail1) {
            return res.status(400).send("Email of member 1 is already registered.");
        }

        if (existingRegisterByEmail2) {
            return res.status(400).send("Email of member 2 is already registered.");
        }

        if (existingRegisterByEmail3) {
            return res.status(400).send("Email of member 3 is already registered.");
        }

        if (existingRegisterByContact1) {
            return res.status(400).send("Contact number of member 1 is already registered.");
        }

        if (existingRegisterByContact2) {
            return res.status(400).send("Contact number of member 2 is already registered.");
        }

        if (existingRegisterByContact3) {
            return res.status(400).send("Contact number of member 3 is already registered.");
        }

        if (existingRegisterByPaymentId) {
            return res.status(400).send("UPI Payment ID is already used.");
        }

        const newRegister = new Register({
            members,
            teamname,
            college,
            collegeId,
            branch,
            member1: { name: name1, email: email1, contact: contact1 },
            member2: name2 && email2 && contact2 ? { name: name2, email: email2, contact: contact2 } : null,
            member3: name3 && email3 && contact3 ? { name: name3, email: email3, contact: contact3 } : null,
            upiPaymentId
        });

        await newRegister.save();
        res.status(200).send("Successfully registered!"); // Or redirect/render a success page
    } catch (error) {
        console.error("Error saving registration:", error);
        res.status(500).send("Error registering. Please try again.");
    }
});

