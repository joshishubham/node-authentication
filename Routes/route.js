//Node-modules
var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash         = require('connect-flash');
var app           = express();

//Database & Passport Files
var crud = require('../Database/data.js');
var pass = require('../Passport/pass.js');

//Rotes
app.get("/", function (req, res) {
   
    res.render('main.ejs')
});

app.get("/sign", function (req, res) {
   
    res.render('sign.ejs')
});

app.get("/login", function (req, res) {
   
    res.render('login.ejs', {message : req.flash("msg")})
});

app.get("/profile", function (req, res) {
   
    res.render('profile.ejs')
});

app.get('/logout', function (req, res) {
    
    req.logout();
    res.redirect('/');
    
});

//Sign-up Post routes.
app.post('/sign', function (req, res) {
        
   var data = new crud({

      Name     : req.body.Name,
      Username : req.body.Username,
      Email    : req.body.Email,
      Password : req.body.Password
  });

  crud.database(data, function (err, show) {
        
         if (err) throw err;
  });

        req.flash('msg', "You are successfully signup and now you can login");
        res.redirect('/login');
        console.log(data);
});

//Log in post routes.
passport.serializeUser(function(user, done){
   
   done(null, user.id); 
});

passport.deserializeUser(function(id, done){
   
   crud.findById(id, function(err, user){
       done(err, user);
   });
});

app.post('/login', passport.authenticate('local', {
         
         successRedirect: '/profile',
         failureRedirect: '/login',
         failureFlash: true 
   })
);

module.exports = app;