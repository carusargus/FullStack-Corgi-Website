var mongoose= require("mongoose"); 

//Set up Schema for Data, think of the schema as a BLUEPRINT for your data  
var campgroundSchema= new mongoose.Schema({
   name:String,
   image: String,
   description: String,
   author:{
      id:{
         type: mongoose.Schema.Types.ObjectId,
         //Ref refers to the User model
         ref:"User"
      },
      username:String
   } ,
   comments:[  //An array not of entire comments but of the Object Ids  : use mongoose.Types.ObjectId.
      {
         type: mongoose.Schema.Types.ObjectId, 
         ref:"Comment" //the name of the model
      }
      ]
});

//Next we compile this schema into a Model... As it will provide us with a bunch of ready made methods we can use e.g. 
//Then we can do things like Campground.find(), Campground.remove(), Campground.create(), etc CRUD operations...//When you go into
//the mongo shell and look at the campground collections, you will see campground gets pluralized 

//NOTE WELL: if you do not includ this module.exports when you require this file it will NOT be able to find it you will get an empty object
//And an error something to the effect TypeError: Campground.find is not a function reason being its returning an empty obj 
module.exports= mongoose.model("Campground", campgroundSchema);