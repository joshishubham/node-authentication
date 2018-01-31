//Node-modules

/*var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app           = express();

app.use(passport.initialize());
app.use(passport.session());

//Database Files
var crud = require('../Database/data.js');

//Passport
passport.use("local-login", new LocalStrategy(function (Username, Password, done) {
	    
	    crud.findOne({Username: Username},function (err, user) {
	    	if (err) {
	    		return done(err)
	   	}
	   	if (!user) {
	   		    console.log("your " + Username)
	   		    return done(null, false, req.flash("msg", "Invalid username."))
	   	}
	   	if (!user.validPassword) {
	   		    console.log("okkk 3")
	   		    return done(null, false, req.flash("msg", "Incorrect Password}."))
	   	}

	   	         return done(null, user)
	 });
}));

passport.serializeUser(function (user, done) {
	       
	      return done(null, user.id)
	});

passport.deserializeUser(function (id, done) {
	       
	      crud.findbyID(id, function (err, user) {

	      	done(err, user)
	     });
	});

module.exports = app;*/