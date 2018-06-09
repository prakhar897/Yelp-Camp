//All requires
var express = 		require("express");
var app = 			express();
var request = 		require("request");
var bodyparser = 	require("body-parser");
var mongoose = 		require("mongoose");
var camp = 			require("./models/camp");
var comment = 		require("./models/comment");
var seedDB = 		require("./seeds");
var passport = 		require("passport");
var localStrategy = require("passport-local");
var User = 			require("./models/user");
var expressSession =require("express-session");
var indexRoutes = 	require("./routes/index");
var commentRoutes = 	require("./routes/comments");
var campgroundRoutes = 	require("./routes/campgrounds");

//Passport Configuration
app.use(expressSession({
	secret: "Big secret",
	resave: false,
	saveUninitialized:false 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MISC Commands
mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+ "/public"));
seedDB();

//routing
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/",indexRoutes);
app.use("/campground/:id/comments",commentRoutes);
app.use("/campground",campgroundRoutes);

app.listen(3000,function(req,res){
	console.log("Listening on port 3000");
});




