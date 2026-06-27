let express = require("express");
let mongoose = require("mongoose");
let passportLocalmongoose = require("passport-local-mongoose").default;
//userschema 
let userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
});
userSchema.plugin(passportLocalmongoose);
let User = mongoose.model("User",userSchema);
module.exports = User;