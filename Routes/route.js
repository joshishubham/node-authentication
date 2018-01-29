//Modules
var express       = require('express');
var passport      = require('passport');
var flash         = require('connect-flash');
var session       = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var bp            = require('body-parser');
var app           = express();

//Passport & Databases Files..
var pass          = require('../Passport/pass.js');
var crud          = require('../Database/data.js');

//Middleware
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bp.json());
app.use(bp.urlencoded({extended : true}));
app.use(session({
  
    secret: "secure",
    resave: true,
    saveUninitialized: true,
}));

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
})); console.log("KKKKK")

passport.serializeUser(function(user, done) {

        done(null, user._id);
});

passport.deserializeUser(function(id, done) {
        
        User.findById(id, function(err, user) {
        done(err, user);
   });
});

passport.use('local-login', new LocalStrategy (
  
    function (Username, Password, done) {

         crud.findOne({Username: Username}, function (err, user,req) {
          console.log("KKKKK");

           if (err) {

                return done(err); 
           }

            if (!user) {

                  return done(null, false, req.flash('msg', "Incorrect Username"));
            }


                return done(null, user);
     });
   }
));

module.exports = app;
