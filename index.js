//Node-modules
var express       = require('express');
var mongoose      = require('mongoose');
var reload        = require('reload');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash         = require('connect-flash');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var bp            = require('body-parser');
var app           = express();

//Database, Routes &  Passport Files
var crud          = require("./Database/data.js");
var pass          = require('./Passport/pass.js');
var routes        = require('./Routes/route.js');

//mongoose connections
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/node-auth", {
	   useMongoClient: true
});

//middleware 
app.use(flash());
app.use(bp.json());
app.use(bp.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
	
	    secret: "secure",
	    resave: true,
	    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

//ejs Templates
app.set('view engine', './views');

//Static file
app.use(express.static('public'));

// Reload code here 
reload(app);

//Routes
app.use('/', routes);

//Listner
app.listen(1234, console.log("http://localhost:1234"));