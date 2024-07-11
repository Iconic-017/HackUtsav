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
<<<<<<< HEAD
        default: null
=======
        validate: {
            validator: function (v) {
                return this.members !== 2 || (v && v.trim() !== '');
            },
            message: 'Please enter the second team member\'s name'
        },
>>>>>>> 363248d8f5e14211be8c44460f46c7a01bbc20dc
    },
    email2: {
        type: String,
<<<<<<< HEAD
        default: null
=======
        validate: {
            validator: function (v) {
                return this.members !== 2 || (v && v.trim() !== '');
            },
            message: 'Please enter the second team member\'s email'
        },
>>>>>>> 363248d8f5e14211be8c44460f46c7a01bbc20dc
    },
    contact2: {
        type: Number,
<<<<<<< HEAD
        default: null
=======
        validate: {
            validator: function (v) {
                return this.members !== 2 || (v && v.toString().length === 10);
            },
            message: props => `${props.value} is an invalid contact number for the second member!`
        },
>>>>>>> 363248d8f5e14211be8c44460f46c7a01bbc20dc
    },
    upiPaymentId: {
        type: String,
        unique: true,
        required: [true, "Please enter your UPI transaction ID"]
    }
<<<<<<< HEAD
})
=======
});
>>>>>>> 363248d8f5e14211be8c44460f46c7a01bbc20dc

const register = new mongoose.model("register", schema);
module.exports = register;
