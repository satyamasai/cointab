const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    "cell":{type: String, required: true},
    "dob":{type: Object, required: true},
    "location":{type: Object, required: true},
    "email":{type: String, required: true},
    "login":{type: Object, required: true},
    "name":{type: Object, required: true},
    "gender":{type: String, required: true},
    "id":{type: Object, required: true},
    "nat":{type: String, required: true},
    "phone":{type: String, required: true},
    "picture":{type: Object, required: true},
    "registered":{type: Object, required: true},

},{timestamps:true});

const userModel = mongoose.model("myuser", userSchema);
module.exports = {
  userModel,
};
