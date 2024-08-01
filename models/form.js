const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    contact: {
        type: String,
        required: [true, 'Contact number is required']
    }
});

const RegisterSchema = new Schema({
    members: {
        type: Number,
        required: true
    },
    teamname: String,
    college: String,
    collegeId: { type: String, required: true },
    branch: String,
    member1: {
        type: MemberSchema,
        required: true
    },
    member2: {
        type: MemberSchema,
        required: function() {
            return this.members >= 2;
        }
    },
    member3: {
        type: MemberSchema,
        required: function() {
            return this.members === 3;
        }
    },
    upiPaymentId: {
        type: String,
        required: true
    },
    interest: {
        type: String,
        required: [true, "Please enter your area of interest!"]
    }
});

module.exports = mongoose.model('Register', RegisterSchema);

