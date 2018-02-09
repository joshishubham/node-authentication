//Node-modules
var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
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
// app.post('/sign', function (req, res, next) {
       
//        console.log("Hello");
//        next()

// }, passport.authenticate('sign', {
         
//          successRedirect: '/profile',
//          failureRedirect: '/login',
//          failureFlash: true 
   
//    }),function (req, res, next){
          
//           console.log('Hello 1');
//           res.redirect("/login");
//           next()
//   }
// );

app.post('/sign', function (req, res){
         
         var data = new crud(req.body)

            data.save()

            console.log(data);

            req.flash('suc', "Successfully");
            
            res.redirect('/login')
   });

//Log in post routes.
app.post('/login', passport.authenticate('login', {
         
         successRedirect: '/profile',
         failureRedirect: '/login',
         failureFlash: true 
   })
);

module.exports = app;