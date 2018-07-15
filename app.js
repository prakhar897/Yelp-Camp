//All requires
var express = 			require("express"),
	app = 				express(),
	request = 			require("request"),
	bodyparser = 		require("body-parser"),
	mongoose = 			require("mongoose"),
	passport = 			require("passport"),
	methodOverride =	require("method-override"),
	localStrategy = 	require("passport-local"),
	expressSession =	require("express-session"),
	flash = 			require("connect-flash"),

	camp = 				require("./models/camp"),
	comment = 			require("./models/comment"),
	User = 				require("./models/user"),

	seedDB = 			require("./seeds"),
	
	indexRoutes = 		require("./routes/index"),
	commentRoutes = 	require("./routes/comments"),
	campgroundRoutes = 	require("./routes/campgrounds")


//Passport Configuration
app.use(flash());
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
//var url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp";
var url = "mongodb://localhost/yelpcamp";
mongoose.connect(url);

app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
//seedDB();
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/campground/:id/comments",commentRoutes);
app.use("/campground",campgroundRoutes);

/*app.listen(process.env.PORT,process.env.IP,function(req,res){
	console.log("Listening on port 3000");
});*/

app.listen(3000,function(req,res){
	console.log("Listening on port 3000");
});


