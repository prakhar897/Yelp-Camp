var camp = 			require("../models/camp");
var comment = 		require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

middlewareObj.checkCampOwner = function (req,res,next){
	if(req.isAuthenticated()){
		camp.findById(req.params.id,function(err,campground){
			if(campground.author.id.equals(req.user._id))
				next();
			else
				res.redirect("back");
		});
	}
	else
		res.redirect("back");
}

middlewareObj.checkCommentOwner = function (req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err,foundComment){
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}
			else
				res.redirect("back");
		});
	}
	else
		res.redirect("back");
}

module.exports = middlewareObj;