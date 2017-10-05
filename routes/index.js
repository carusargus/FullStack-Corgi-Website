var express = require("express");
var router = express.Router();
var passport = require("passport"); 
var User = require("../models/user")



//like most landing pages are located on the root path i.e. '/'
router.get("/", function(req, res){
    res.render("landing");
});



//  ===========
// AUTHENTICATION ROUTES
//  ===========

//Gets/ displays sign up or Register form for user to sign up as a user 
router.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

//Display login form
router.get("/login", function(req, res){
   res.render("login", {message: req.flash("error")}); 
});


//Handles user submitted login form above/ login logic, 
//when a request comes to /login the middleware will run first i.e. passport.authenticate...looks like 
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// if user is logged in this routes logs them out i.e. destroys their session 
router.get("/logout", function(req, res){
    //Comes from the passport packages installed 
   req.logout();
   res.redirect("/campgrounds");
});

//To check if user is logged in, can be used in any route to check 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Plese Login First"); 
    res.redirect("/login");
}

module.exports= router; 