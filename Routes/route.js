//Node-modules
var express       = require('express');
var passport      = require('passport');
var app           = express();

//Passport & Databases Files..
var pass          = require('../Passport/pass.js');
var crud          = require('../Database/data.js');

//Routes
app.get('/', function (req, res) {
	  
	  res.render("main.ejs")
});

app.get('/sign', function (req, res) {
	  
	  res.render('signup.ejs', {message: req.flash('msg')});
});

app.get('/log', function (req, res) {
	  
	  res.render('log.ejs', {message: req.flash('msg')});
});

app.get('/profile', function (req, res) {
	  
	  res.render('profile.ejs');	   
});

app.get('/logout', function (req, res) {
	  
	  req.logout();
	  res.redirect('/') 
});

//Sign-up post routes
app.post('/sign', function (req, res) {
	  
   var data = new crud({

 	     Name: req.body.Name,
 	     Username: req.body.Username,
       Email: req.body.Email,
       Password: req.body.Password,
       Confirm: req.body.Confirm
   
   });

     crud.database(data, function (err, show) {
     	  
     	  if (err) throw err;
  });
        
        req.flash('msg', 'You are successfully signup and now you can login');
	      res.redirect('/log');

        console.log("signup successfully");
});

//Log-in post routes
app.post('/log', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/log',
        failureFlash: true
}));

module.exports = app;