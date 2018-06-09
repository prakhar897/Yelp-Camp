var express = require("express");
var router = express.Router({mergeParams:true});
var camp = 			require("../models/camp");
var comment = 		require("../models/comment");

router.get("/new",isLoggedIn,function(req,res){
	camp.findById(req.params.id,function(err,camp){
		if(err)
			console.log(err);
		else		
			res.render("comments/new",{campground:camp});
	});
});

router.post("/",isLoggedIn,function(req,res){
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

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;