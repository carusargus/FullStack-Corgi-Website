var express = require("express");
//a new instance of the express router, then add all the routes to router 
var router= express.Router({mergeParams:true}); 
//Currently inside of routes dir, & need to go inside of the models dir to find campgroud.js
var Campground = require("../models/campground")
var Comment = require("../models/comment")


var middleware = require("../middleware");



// ====================
// COMMENTS ROUTES
// ====================

//New comments 
//When user makes get request to page with comment, middleware is logged in will run first & check if user is logged in if Yes
// Then will call next, which will then run the call back function 
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             //this is not just 'new' inside of views but inside of comments dir
             res.render("comments/new", {campground: campground});
        }
    })
});


//Creates user comments
//middle ware prevents anyone from adding a comment if they are not logged in
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
             
             comment.author.id = req.user._id  
               
             comment.author.username=req.user.username
             comment.save(); 
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});



//Rounte to edit comments
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            console.log(err); 
        }else{
              res.render("comments/edit",{campground_id:req.params.id, comment: foundComment });
        }
    });
  
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else{
          res.redirect("/campgrounds/"+ req.params.id );
      }
   });
});

//Destroy comment route
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back"); 
       }else{
           res.redirect("/campgrounds/"+ req.params.id);
       }
   })
    
}); 



function checkCommentOwnership(req, res, next){
        if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
           res.redirect("back");
        } else{    
            //does user own camground...Previously got error: TypeError: Cannot read property 'equals' of undefined
            //reason being this was from the Seeded data base which had no user so it was indeed undefined. 
            //Also have to use .equals as .author._id is a string and the other was a mongoose Object 
            console.log(req.user._id)
            if(foundComment.author.id.equals(req.user._id)){
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