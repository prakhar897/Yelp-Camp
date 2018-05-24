var express = 		require("express");
var app = 			express();
var request = 		require("request");
var bodyparser = 	require("body-parser");
var mongoose = 		require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp");

var campSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var camp = mongoose.model("camp",campSchema);

/*camp.create({
	name:"Mahabaleshwar",
	image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg/1200px-Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg",
	description:"Great place to go"
},function(err,cam){
	if(err)
		console.log(err);
	else
		console.log(cam);
});*/


app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");


app.get("/",function(req,res){
	res.render("home");
});

app.get("/campground",function(req,res){
	camp.find({},function(err,camps){
		if(err)
		console.log(err);
		else
		res.render("index",{campground:camps});
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
	res.render("new");
	
});

app.get("/campground/:id",function(req,res){
	camp.findById(req.params.id,function(err,camp){
		if(err)
			console.log(err);
		else
			res.render("show",{campground:camp});
	});
});

app.listen(3000,function(req,res){
	console.log("Listening on port 3000");
});

