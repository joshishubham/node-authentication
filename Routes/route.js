//Node-modules
var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app           = express();

//Database & Passport Files
var crud = require('../Database/data.js');
var pass = require('../Passport/pass.js');

passport.serializeUser(function(user, done) {
        
     done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    
     crud.findById(id, function(err, user) {
        done(err, user);
   });
});

//Rotes
app.get("/", function (req, res) {
   
    res.render('sign.ejs',{
        
     error   : req.flash('err')

   });
});

app.get("/login", function (req, res) {
   
    res.render('login.ejs', {

        message : req.flash("suc"), 
        error   : req.flash('err') 
    });
});

app.get("/profile", function (req, res) {
   
    res.render('profile.ejs')
});

app.get('/logout', function (req, res) {
    
    req.logout();
    res.redirect('/');
    
});

//Sign-up Post routes.
app.post('/sign', passport.authenticate('signup', {

         successRedirect: '/login',
         failureRedirect: '/',
         failureFlash: true
   })
);

//Log in post routes.
app.post('/login', passport.authenticate('login', {
         
         successRedirect: '/profile',
         failureRedirect: '/login',
         failureFlash: true 
   })
);

module.exports = app;