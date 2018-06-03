var mongoose = require("mongoose");
var camp = require("./models/camp");
var comment = require("./models/comment");

var data = [
	{
		name:"Mahabaleshwar",
		image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg/1200px-Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg",
		description:"Great place to go"
	},
	{
		name:"TableTop",
		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLcEp1ld68tW01I2VSGeE24EZWn1IWSXzVfRtL5txozTyIKxpbXg",
		description:"Poco loco loco"
	}
];

function seedDB(){
	comment.remove({},function(err){
		if(err)
			console.log(err);
		else
		{
			camp.remove({},function(err){
				if(err)
					console.log(err);
				else
				{
					data.forEach(function(seed){
						camp.create(seed,function(err,campground){
							if(err)
								console.log(err);
							else
							{
								comment.create({
									content: "I wish i could go there too",
									author:"Taki"
								},function(err,comment){
									if(err)
										console.log(err);
									else
										campground.comments.push(comment);
										campground.save();
								});
							}
						});
					});
				}
			});
		}
	});
	
}

module.exports = seedDB;
