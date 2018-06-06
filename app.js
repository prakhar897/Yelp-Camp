//All requires
var express = 		require("express");
var app = 			express();
var request = 		require("request");
var bodyparser = 	require("body-parser");
var mongoose = 		require("mongoose");
var camp = 			require("./models/camp");
var comment = 		require("./models/comment");
var seedDB = 		require("./seeds");

//MISC Commands
mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+ "/public"));
seedDB();


app.get("/",function(req,res){
	res.render("home");
});

app.get("/campground",function(req,res){
	camp.find({},function(err,camps){
		if(err)
		console.log(err);
		else
			res.render("campgrounds/index",{campground:camps});
	});
});

app.post("/campground",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var object = new camp({
		name:name,
		image:image,
		description: desc
	});

	object.save(object,function(err,camp){
		if(err)
			console.log(err);
		else
			res.redirect("/campground");
	});
});

app.get("/campground/new",function(req,res){
	res.render("campgrounds/new");
	
});

app.get("/campground/:id",function(req,res){
	camp.findById(req.params.id).populate("comments").exec(function(err,camp){
		if(err)
			console.log(err);
		else
			res.render("campgrounds/show",{campground:camp});
	});
});



//COMMENT ROUTES
// app.get("/campground/:id/comments",function(req,res){

// });

app.get("/campground/:id/comments/new",function(req,res){
	camp.findById(req.params.id,function(err,camp){
		if(err)
			console.log(err);
		else		
			res.render("comments/new",{campground:camp});
	});
});

app.post("/campground/:id/comments",function(req,res){
	camp.findById(req.params.id,function(err,camp){
		if(err)
			console.log(err);
		else
			comment.create(req.body.comment,function(err,comment){
				if(err)
					console.log(err);
				else
				{
					camp.comments.push(comment);
					camp.save();
					res.redirect("/campground/" + camp._id);
				}
			});
	});
});


app.listen(3000,function(req,res){
	console.log("Listening on port 3000");
});

