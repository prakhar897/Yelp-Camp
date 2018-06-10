var express = require("express");
var router = express.Router();
var camp = 			require("../models/camp");
var middleware = require("../middleware");

//INDEX Route
router.get("/",function(req,res){
	camp.find({},function(err,camps){
		if(err)
		console.log(err);
		else
			res.render("campgrounds/index",{campground:camps});
	});
});

//Create Route
router.post("/",middleware.isLoggedIn,function(req,res){
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

//New Route
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
	
});

//SHOW Route
router.get("/:id",function(req,res){
	camp.findById(req.params.id).populate("comments").exec(function(err,camp){
		if(err)
			console.log(err);
		else
			res.render("campgrounds/show",{campground:camp});
	});
});

//EDIT Route
router.get("/:id/edit",middleware.checkCampOwner,function(req,res){
	camp.findById(req.params.id,function(err,campground){
		res.render("campgrounds/edit",{campground:campground});
	});	
});

//UPDATE Route
router.put("/:id",middleware.checkCampOwner,function(req,res){
	camp.findByIdAndUpdate(req.params.id,req.body.camp,function(err,updatecamp){
		if(err)
			console.log(err);
		else
			res.redirect("/campground/" + req.params.id);
	});
});

//DELETE Route
router.delete("/:id",middleware.checkCampOwner,function(req,res){
	camp.findByIdAndRemove(req.params.id,function(err,camp){
		if(err)
			console.log(err);
		else
			res.redirect("/campground");
	});
});


module.exports = router;