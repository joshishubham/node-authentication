//Node-modules
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var crud   = require('../Database/data.js');

passport.serializeUser(function(user, done) {
        
     done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    
     crud.findById(id, function(err, user) {
        done(err, user);
   });
});

//Passport Sign-Up authentication..
// passport.use('sign',  new LocalStrategy ({
     
//      usernameField: "Email",
//      passwordField: "Password"

// }, function (Name, Username, Email, Password, Confirm, done, req) {
       
//        crud.findOne({Email : Email}, function (err, user) {
             
//              if (err) {

//                 return done(err);
//              }

//              if (user) {
       
//                 return done(null, false, console.log("Email is already used!"));
//                 //return done(null, false, req.flash("msg", "Incorrect Email"));
//              }

//              else{

//                    var data = new crud()

//                       //data.Name     = Name;
//                       //data.Username = Username;
//                       data.Email    = Email;
//                       data.Password = Password;
//                       //data.Confirm  = Confirm;

//                         data.save(function (err) {
                              
//                           if (err) 

//                             throw err;

//                            return done(null, user)
//                     });
//              }
             
//         });
//     })
// );

//Passport Log-In authentication..
passport.use('login',  new LocalStrategy ({
     
     usernameField: "Email",
     passwordField: "Password"

}, function (Email, Password, done, req) {
       
       crud.findOne({Email : Email}, function (err, user) {
             
             if (err) {

                return done(err);
             }

             if (!user) {
       
                return done(null, false, console.log("Incorrect Email"));
                //return done(null, false, req.flash('err', 'Incorrect Email'));
             }

                return done(null, user)
       });
}));