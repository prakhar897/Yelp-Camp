var express = require("express");
var router = express.Router();
var camp = 			require("../models/camp");

router.get("/",function(req,res){
	camp.find({},function(err,camps){
		if(err)
		console.log(err);
		else
			res.render("campgrounds/index",{campground:camps});
	});
});

router.post("/",isLoggedIn,function(req,res){
	var author = {
		id:req.user._id,
		username:req.user.username
	}
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var object = new camp({
		name:name,
		image:image,
		description: desc,
		author:author
	});

	object.save(object,function(err,camp){
		if(err)
			console.log(err);
		else
			res.redirect("/campground");
	});
});

router.get("/new",isLoggedIn,function(req,res){
	res.render("campgrounds/new");
	
});

router.get("/:id",function(req,res){
	camp.findById(req.params.id).populate("comments").exec(function(err,camp){
		if(err)
			console.log(err);
		else
			res.render("campgrounds/show",{campground:camp});
	});
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;