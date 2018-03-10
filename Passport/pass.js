// //Node-modules
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');


var crud   = require('../Database/data.js');


//Passport Sign-Up authentication..
passport.use('signup', new LocalStrategy ({

       usernameField : "Email",
       passwordField : "Password",
       passReqToCallback: true
}, 
   function (req, Email, Password, done) {
      
      crud.findOne({Email:Email},function (err, user) {
        
         if (err) {

            return done(err);
         }

         if (user) {

            return done(null, false, req.flash("err", "Email is already used"));
         }
         
         // if (user) {

         //    return done(null, false, console.log("err", "Email is already used"));
         // }

          else{

               bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(req.body.Password, salt, function(err, hash) {
                
                var data = new crud({

                    Email    : req.body.Email,
                    Username : req.body.Username,
                    Name     : req.body.Name,
                    Password : hash,
                    Confirm  : req.body.Confirm
                })

                data.save(function (err) {
                      
                      if (err) 

                        throw err;

                      return done(null, data, req.flash("suc", "You have successfully sign up and can you now login"));
              });
           });
        });
       }
    });
  })
)

//Passport Log-In authentication..
passport.use('login', new LocalStrategy ({
       
       usernameField : "Email",
       passwordField : "Password",
       passReqToCallback: true 
},
   function(req, Email, Password,done){

      crud.findOne({Email:Email}, function (err, user) {

           if (err) {

              return done(err)

           }

           if (!user) {

              //return done(null, false, console.log("Invalid Email"));
              return done(null, false, req.flash("err", "Invalid Email"));
           }

           if (!user.validPassword(Password)) {

                //return done(null, false, console.log("Invalid Password"));
                return done(null, false, req.flash("err", "Invalid Password"))
           }

             return done(null, user);
      })
   }
));