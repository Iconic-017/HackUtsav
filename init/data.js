const mongoose = require("mongoose");
const register = require("../models/form.js")

let MONGOOSE_URL = "mongodb://127.0.0.1:27017/hackathon";

main()
.then(() => {
    console.log("connected to DataBase");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGOOSE_URL);
}


const initDB = async () => {
    await register.deleteMany({});
    console.log("data was initialized");
}