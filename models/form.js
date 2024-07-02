const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique : true
    },
    contact : {
        type: Number,
        required : true,
        unique : true
    },
    college: {
        type : String , 
        required : true
    },
    teamName: {
        type: String,
        required : true
    },
    name2 : {
        type : String,
        default : "none"
    },
    contact2 : {
        type : Number,
    },
    upiPaymentId: {
        type: String,
        unique: true 
    }
})


const register = new mongoose.model("register" , schema);
module.exports = register;