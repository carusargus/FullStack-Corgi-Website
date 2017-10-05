#add Mongoose
* Install and congif mongoose
* Setup campground model
* use campground model inside of Routes
* 


#show Page
* Review the RESTFUl routs
* add description to campground model
* drop database (will reseed with new data)
* add show route
* 

# Refactor mongoose code
* create model directory
* use module.exports
* Require all modules correctly 
* 

#RESTFUL Routes
name        url                  verb        Desc.
==================================================
INDEX       /campgrounds        GET         Displays all campgrounds
NEW         /campgrounds/new    GET         Displays form to make Campground
CREATE      /campgrounds        POST        Add a new campground to DB
SHOW        /campgrounds/:id    GET         Shows infor about one particular campground

NOTE WELL
Our campgrounds ROUTE will NOT look like this: 
NEW         /comments/new       GET    BECAUSE this comment has no information tied to a particular campground; this would work IF you were arbitrarily creating comments but we want them to be associated to a particular campground 
CREATE      /comments           POST


What our route will actually look like will be
NEW        campgrounds/:id/comments/new   REASON BEING because a comment is DEPENDENT on a campground 
CREATE      campgrounds/:id/comments           POST

# add user model    
    -Install packages for authentication (passport)
        - npm install passport passport-local passport-local-mongoose express-session --save
    -Define user model 
    
#Login similar to Authentication need two routes
    -Add login routes - one to show the form
    -login template - the other to process the form 
    

# associate User With their comments so will save username automatically 
    

#Users + campgrounds
    * Prevent unauthetnticated user from creating campgrounds i.e. must be sign in
    * save username & id to newly created campground
    
    
---------------------------------
 #v10
 *add method overrides
 * edit routes for campgrounds
 * Add link to allow user to edit page
 * update route


Prevent just any user from Editing comments
* Route to be defined /campgrounds/:id/comments/:comment_id/edit

# add destroy route for comments
* add delete button/ form to send requst 
* /campgrounds/:id/comments/:commentid

