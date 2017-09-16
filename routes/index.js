var express = require('express');
var router = express.Router();
var mongo = require("mongodb");
var http = require("http");
var mongoClient = require("mongodb").MongoClient;

// Get Homepage
router.get('/', function(req, res){
	if(req.user){
		switch(req.user.role){
		case "t":
			var d = new Date().getDay(), h = new Date().getHours(), m = new Date().getMinutes();
			d=0;//monday
			h=8;
			m=12;
			var t=0;
			var cTime= parseInt(h+""+m);	
			var time = req.user.time;
			for(iii=0; iii<time[d].time.length; iii++){
				if(time[d].time[iii][0]<cTime && cTime<time[d].time[iii][1]){
					res.send(time[d].time[iii][2])
					
					
				} else{
					t = t+1;
					if(t==time[d].time.length){
						res.send("no class now")
					}
				}
			}
			
			break;
		case "a":
			req.flash("success_msg", "admin dashboard not available");
			res.redirect("/users/settings");
			break;
		default:
			res.send("your role is not specified in the db");
			break;
	};
	}else{
		res.render("login");
	}
	
	
});



module.exports = router;