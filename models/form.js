const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    members: {
        type: Number,
        validate: {
            validator: function(v) {
                return v === 1 || v === 2;
            },
            message: 'Team members can be either 1 or 2'
        },
        required: true
    },

    teamName: {
        type: String,
        required : true
    },

    college: {
        type : String , 
        required : true
    },

    name1: {
        type : String,
        required : true
    }, 
    email1: {
        type: String,
        required : true,
        unique : true
    },
    contact1 : {
        type: Number,
        required : true,
        unique : true,
        default : none
    },
    name2 : {
        type : String,
        default : "none"
    },
    email2 : {
        type : String,
        default : "none"
    },
    contact2 : {
        type : Number,
        default : "none"
    },
    upiPaymentId: {
        type: String,
        unique: true 
    }
})


const register = new mongoose.model("register" , schema);
module.exports = register;