//Node-modules
<!--

onerror = showError

  function showError(x, y, z) {
      
      console.lo(x+" "+y+" "+z)    
      
  };

var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
    //if (req.user) return res.require('/');
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

 	     Name    : req.body.Name,
 	     Username: req.body.Username,
       Email   : req.body.Email,
       Password: req.body.Password,
 });

     crud.database(data, function (err, show) {
     	  
     	  if (err) throw err;
  });
        
        req.flash('msg', 'You are successfully signup and now you can login');
	      res.redirect('/log');

        console.log(data);
});

//Log-in post routes
app.post('/log', passport.authenticate('log', {

        successRedirect: '/profile',
        failureRedirect: '/log',
        failureFlash: true

}), function (req, res) {
              
      res.redirect('/profile');
      console.log("body parsing", req.body)
});

passport.serializeUser(function (user, done) {
         
        return done(null, user.id)
  });

passport.deserializeUser(function (id, done) {
         
        crud.findbyID(id, function (err, user) {

          done(err, user)
       });
  });

passport.use("log", new LocalStrategy({
      
        usernameField: 'Email',
        passportasswordField: 'Password',
        passReqToCallback : true

},function (Email, Password, done, req) {
      
      crud.findOne({Email: Email},function (err, user) {
        
      if (err) {
          console.log("succeess");
          return done(err)
      }
      
      if (!user) {
            console.log("your " + Email)
            return done(null, false, req.flash("msg", "Invalid username."))
      }
      
      if (!user.validPassword(Password)) {
            console.log("okkk 3")
            return done(null, false, req.flash("msg", "Incorrect Password}."))
      }

               return done(null, user)
    });

}));

module.exports = app;
-->