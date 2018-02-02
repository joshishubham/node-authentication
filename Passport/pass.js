// // // //Node-modules
var passport 	    = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var crud   = require('../Database/data.js');

passport.serializeUser(function(user, done){
   
   done(null, user.id); 
});

passport.deserializeUser(function(id, done){
   
   crud.findById(id, function(err, user){
       done(err, user);
   });
});


passport.use('local',  new LocalStrategy ({
     
     usernameField: "Email",
     passwordField: "Password"

}, function (Email, Password, done, req) {
       
       crud.findOne({Email : Email}, function (err, user) {
             
             if (err) {

                return done(err);
             }

             if (!user) {
       
                return done(null, false, console.log("Incorrect Email"));
                //return done(null, false, req.flash("msg", "Incorrect Email"));
             }

             // if (!user.verifyPassword(Password)) {
       
             //    return done(null, false, console.log("Incorrect Password"));
             //    //return done(null, false, req.flash("msg", "Incorrect Email"));
             // }

                return done(null, user)
       });
}));