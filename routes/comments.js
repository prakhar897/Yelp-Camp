var express = require("express");
var router = express.Router({mergeParams:true});
var camp = 			require("../models/camp");
var comment = 		require("../models/comment");
var middleware = require("../middleware");

//NEW Route
router.get("/new",middleware.isLoggedIn,function(req,res){
	camp.findById(req.params.id,function(err,camp){
		if(err)
			console.log(err);
		else		
			res.render("comments/new",{campground:camp});
	});
});

//CREATE Route
router.post("/",middleware.isLoggedIn,function(req,res){
	camp.findById(req.params.id,function(err,camp){
		if(err)
			console.log(err);
		else
			comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err);
				else
				{

					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					camp.comments.push(comment);
					camp.save();
					comment.save();
					res.redirect("/campground/" + camp._id);
				}
			});
	});
});

//EDIT Route
router.get("/:comment_id/edit",middleware.checkCommentOwner,function(req,res){
	camp.findById(req.params.id,function(err,foundCamp){
		if(err)
			console.log(err);
		else
			comment.findById(req.params.comment_id,function(err,foundComment){
			if(err)
				console.log(err);
			else
				res.render("comments/edit",{campground:foundCamp,comment:foundComment});
		});
	});
});

//UPDATE Route
router.put("/:comment_id",middleware.checkCommentOwner,function(req,res){
	comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
		if(err)
			console.log(err);
		else
			res.redirect("/campground/"+ req.params.id);
	});
});

//DELETE Route
router.delete("/:comment_id",middleware.checkCommentOwner,function(req,res){
	comment.findByIdAndRemove(req.params.comment_id,function(err){
		res.redirect("/campground/"+ req.params.id);
	});
});

module.exports = router;