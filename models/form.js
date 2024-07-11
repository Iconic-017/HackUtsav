const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    members: {
        type: Number,
        validate: {
            validator: function (v) {
                return v === 1 || v === 2;
            },
            message: 'Team members can be either 1 or 2'
        },
        required: [true, "Number of members are required"]
    },
    teamname: {
        type: String,
        required: [true, "Please choose a team name for the event"]
    },
    college: {
        type: String,
        required: [true, "Please enter your college!"]
    },
    name1: {
        type: String,
        required: [true, "Please enter your name!"]
    },
    email1: {
        type: String,
        required: [true, "Email is required!"],
        // unique: true
    },
    contact1: {
        type: Number,
        required: [true, 'Contact number is required'],
        unique: true,
        validate: {
            validator: function (v) {
                return v.toString().length === 10;
            },
            message: props => `${props.value} is an invalid contact number!`
        },
    },
    name2: {
        type: String,
        default: null
    },
    email2: {
        type: String,
        default: null
    },
    contact2: {
        type: Number,
        default: null
    },
    upiPaymentId: {
        type: String,
        unique: true,
        required: [true, "Please enter your UPI transaction ID"]
    }
})

const register = new mongoose.model("register", schema);
module.exports = register;
