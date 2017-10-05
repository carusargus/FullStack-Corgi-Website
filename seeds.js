var mongoose = require("mongoose"), 

Campground    = require("./models/campground"),
Comment       = require("./models/comment");

//Our Seed data will be uploaded to the Mongo DB ; an array of objects with exactly what our model is expecting: name, image, description
var data = [
    
    {
        name:"Land of Corgi",
        image: "https://farm3.staticflickr.com/2141/2503696334_c104475c89.jpg",
        description:"Occupy mlkshk kale chips woke, listicle locavore next level fingerstache glossier aesthetic man braid before they sold out kitsch prism. Cred copper mug freegan, flannel YOLO single-origin coffee skateboard artisan four loko church-key man bun. Synth literally gastropub, kombucha chillwave helvetica offal truffaut church-key freegan pop-up gentrify narwhal. Kombucha viral vexillologist green "
    },
     { 
        name:"The Queens Corgi's",
        image: "https://farm6.staticflickr.com/5023/5682310520_022f1590de.jpg",
        description:"Let's build some happy little clouds up here. If you do too much it's going to lose its effectiveness. Maybe there was an old trapper that lived out here and maybe one day he went to check his beaver traps, and maybe he fell into the river and drowned. Clouds are free. They just float around the sky all day and have fun. So often we avoid running water, and running water is a lot of fun. The little tiny Tim easels will let you down. "
    },
     {
        name:"Camp Corgi's",
        image: "https://farm4.staticflickr.com/3184/2502865739_8b73b92bd2.jpg",
        description:"Sometimes you learn more from your mistakes than you do from your masterpieces. Just make little strokes like that. Only think about one thing at a time. Don't get greedy. The only thing worse than yellow snow is green snow. Trees grow in all kinds of ways. They're not all perfectly straight. Not every limb is perfect. See how easy it is to create a little tree right in your world."
    }
    
    
];

function seedDB(){
    //Will remove all campgrounds currently on Mongo DB 
    Campground.remove({}, function(err){
   if(err){
       console.log(err); 
   }else{
       console.log("removed campgrounds")
        //Add a few sample campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added a campground");  
                        //Create a comment on each Campground
                        Comment.create({
                            text:"This place is great, just wish there were MOAR Corgis", 
                            author:"Richard Samples "
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                               
                            campground.comments.push(comment);
                            campground.save();  
                            console.log("Created new comment ")
                            }
                            
                        });
                    }
                });
            });
    
   }
       
    });
   
    
}

module.exports = seedDB; 
