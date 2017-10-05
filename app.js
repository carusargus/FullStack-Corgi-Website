var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    flash       =require("connect-flash"),
methodOverride  = require("method-override"),
    seedDB      = require("./seeds")  //since it is in the same directory as the app.js file we need to use ./

//Requiring all routes     
var commentRoutes = require("./routes/comments"),
campgroundRoutes  = require("./routes/campgrounds"),
indexRoutes          = require("./routes/index")

//Will create the yelp_camp0 DB inside of MongoDB 
//mongoose.connect("mongodb://localhost/yelp_camp"); //gives warning: `open()` is deprecated in mongoose >= 4.11.0,     
mongoose.connect('mongodb://localhost/yelp_camp_v6', { useMongoClient: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//_method tells method what to look for 
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); seeds/ erases any previous user data

// CONFIGURATION of Passport
app.use(require("express-session")({
    //used to serialize and deserialize ; could be anything
    secret: "Corgis are the best!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// User.authenticate, a method within passportLocalMongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passes currentUser:req.user to every template
app.use(function(req, res, next){
    //Whatever is put inside of .local is available to every template 
  res.locals.currentUser = req.user;
  res.locals.message = req.flash("error"); 
  next();
});


//Tells the app to use the 3 routes we have required 
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
//SAYS all routes should begin with /campgrounds for DRY code 
app.use("/campgrounds",campgroundRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server Has Started!");
});