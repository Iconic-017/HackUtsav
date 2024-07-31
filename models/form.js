// const mongoose = require("mongoose");

// const schema = new mongoose.Schema({
//     members: {
//         type: Number,
//         validate: {
//             validator: function (v) {
//                 return v >= 1 && v <= 3;
//             },
//             message: 'Team members can be between 1 and 3'
//         },
//         required: [true, "Number of members is required"]
//     },
//     teamname: {
//         type: String,
//         required: [true, "Please choose a team name for the event"]
//     },
//     college: {
//         type: String,
//         required: [true, "Please enter your college!"]
//     },
//     collegeId: {
//         type: String,
//         required: [true, "Please enter your college ID"]
//     },
//     branch: {
//         type: String,
//         required: [true, "Please enter your branch!"]
//     },
//     name1: {
//         type: String,
//         required: [true, "Please enter your name!"]
//     },
//     email1: {
//         type: String,
//         required: [true, "Email is required!"]
//     },
//     contact1: {
//         type: Number,
//         required: [true, 'Contact number is required'],
//         unique: true,
//         validate: {
//             validator: function (v) {
//                 return v.toString().length === 10;
//             },
//             message: props => `${props.value} is an invalid contact number!`
//         }
//     },
//     name2: {
//         type: String,
//         default: null,
//         validate: {
//             validator: function (v) {
//                 return this.members >= 2 || (v && v.trim() !== '');
//             },
//             message: 'Please enter the second team member\'s name'
//         }
//     },
//     email2: {
//         type: String,
//         default: null,
//         validate: {
//             validator: function (v) {
//                 return this.members >= 2 || (v && v.trim() !== '');
//             },
//             message: 'Please enter the second team member\'s email'
//         }
//     },
//     contact2: {
//         type: Number,
//         default: null,
//         validate: {
//             validator: function (v) {
//                 return this.members >= 2 || (v && v.toString().length === 10);
//             },
//             message: props => `${props.value} is an invalid contact number for the second member!`
//         }
//     },
//     name3: {
//         type: String,
//         default: null,
//         validate: {
//             validator: function (v) {
//                 return this.members === 3 || (v && v.trim() !== '');
//             },
//             message: 'Please enter the third team member\'s name'
//         }
//     },
//     email3: {
//         type: String,
//         default: null,
//         validate: {
//             validator: function (v) {
//                 return this.members === 3 || (v && v.trim() !== '');
//             },
//             message: 'Please enter the third team member\'s email'
//         }
//     },
//     contact3: {
//         type: Number,
//         default: null,
//         validate: {
//             validator: function (v) {
//                 return this.members === 3 || (v && v.toString().length === 10);
//             },
//             message: props => `${props.value} is an invalid contact number for the third member!`
//         }
//     },
//     upiPaymentId: {
//         type: String,
//         unique: true,
//         required: [true, "Please enter your UPI transaction ID"]
//     }
// });

// const Register = mongoose.model("Register", schema);
// module.exports = Register;






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
    }
});

module.exports = mongoose.model('Register', RegisterSchema);
