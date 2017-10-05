var express = require("express");
//a new instance of the express router, then add all the routes to router 
var router= express.Router(); 
var Campground= require("../models/campground");
var middleware = require("../middleware");


//Currently inside of routes dir, & need to go inside of the models dir to find campgroud.js
// ../ means parent of current dir i.e. v7 
// var Campground = require("../models/campground");

//INDEX Route: displaus all campgrounds
router.get("/", function(req, res){
    
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

//CREATE - add new campground to DB Note well: the middle ware checks if user is logged in if Not redirects to log in page
//if logged in then capable of creating new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newCampground = {name: name, image: image, description: desc, author:author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});


//NEW ROUTE-show the FORM, which will send user entered data to the above Post route 
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
//1st find the campground with ID, 2nd render show template with that campground
    //we are using FindById method provided by mongoose takes two parameters 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//need to check if the USER id match the id for the author of that campground 
//is user loggedin & does user own campground? If not then redirect 

//Edit campground Route--Produce form, which will be handled by the Update Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    //is user logged in?
          Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground:foundCampground})
    });
});


// Update campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //Find & update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds/"+ updatedCampground._id); 
        }
    })
    
    //redirect to show page
});


//Destroy campground Route
//Delete middle ware if you want anyone to be able to delete, current only User can delete their campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
        
        
    });
}); 



function checkCampgroundOwnership(req, res, next){
        if(req.isAuthenticated()){
          Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
           res.redirect("back");
        } else{    
            //does user own camground...Previously got error: TypeError: Cannot read property 'equals' of undefined
            //reason being this was from the Seeded data base which had no user so it was indeed undefined. 
            //Also have to use .equals as .author._id is a string and the other was a mongoose Object 
            console.log(req.user._id)
            if(foundCampground.author.id.equals(req.user._id)){
                next(); 
            }else {
                res.redirect("back")
            }
        }
    });
    }else{
        //take the user back
      res.redirect("back");
    }
}

module.exports = router; 