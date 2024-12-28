const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gpa: Double
})

const UserModel = mongoose.model("members", UserSchema)
module.exports = UserModel