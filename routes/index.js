var express = require("express");
var router = express.Router();
var User = 	require("../models/user");
var passport = require("passport");

router.get("/",function(req,res){
	res.render("home");
});

router.get("/signup",function(req,res){
	res.render("signup");
});

router.post("/signup",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			res.redirect("back");
		}
		else
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campground"); 
		});
	});
});

router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",{
	successRedirect:"/campground",
	failureRedirect:"/login"
}),function(req,res){
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Successfully Logged Out.")
	res.redirect("/");
});

module.exports = router;
