var camp = 			require("../models/camp");
var comment = 		require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You are not logged in!!!");
	res.redirect("/login");
}

middlewareObj.checkCampOwner = function (req,res,next){
	if(req.isAuthenticated()){
		camp.findById(req.params.id,function(err,campground){
			if(err)
				console.log(err);
			else{
				if(campground.author.id.equals(req.user._id))
					next();
				else{
					req.flash("error","You Dont have permission to do that");
					res.redirect("back");
				}	
			}
		});
	}
	else{
		req.flash("error","You are not logged in!!!");
		res.redirect("back");
	}	
}

middlewareObj.checkCommentOwner = function (req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err,foundComment){
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}
			else{
				req,flash("error","Permission Denied");
				res.redirect("back");
			}
		});
	}
	else
		res.redirect("back");
}

module.exports = middlewareObj;