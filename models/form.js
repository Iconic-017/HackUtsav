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
        unique: true
    },
    contact1: {
        type: Number,
        required: [true, 'Contact number is required'],
        unique: true,
        validate: {
            validator: function (v) {
                // Convert the number to string to check the length
                return v.toString().length === 10;
            },
            message: props => `${props.value} is an invalid contact number!`
        },
    },

    name2: {
        type: String,
        // validate: {
        //     validator: function (v) {
        //         return this.members !== 2 || (v && v !== 'none');
        //     },
        //     message: 'Please enter the second team member\'s name'
        // },
        default: 'none'
    },

    email2: {
        type: String,
        // validate: {
        //     validator: function (v) {
        //         return this.members !== 2 || (v && v !== 'none');
        //     },
        //     message: 'Please enter the second team member\'s email'
        // },
        default: 'abcd@gmail'
    },

    contact2: {
        type: Number,
        // validate: {
        //     validator: function (v) {
        //         // If members is 2, contact2 should not be the default value and should be a 10 digit number
        //         return this.members !== 2 || (v && v !== 'none' && v.toString().length === 10);
        //     },
        //     message: props => `${props.value} is an invalid contact number for the second member!`
        // },
        default: 'none'
    },

    upiPaymentId: {
        type: String,
        unique: true,
        required: [true, "Please enter your UPI transaction ID"]
    }
})


const register = new mongoose.model("register", schema);
module.exports = register;