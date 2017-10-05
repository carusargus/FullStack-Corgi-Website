var mongoose = require("mongoose"); 
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Adds in various useful methods for user Auth to the user model 
UserSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User", UserSchema); 