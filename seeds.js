var mongoose = require("mongoose");
var camp = require("./models/camp");
var comment = require("./models/comment");

var data = [
	{
		name:"Mahabaleshwar",
		image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg/1200px-Monasterio_Khor_Virap%2C_Armenia%2C_2016-10-01%2C_DD_25.jpg",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"TableTop",
		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLcEp1ld68tW01I2VSGeE24EZWn1IWSXzVfRtL5txozTyIKxpbXg",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
