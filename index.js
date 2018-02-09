//Node-modules
var express       = require('express');
var mongoose      = require('mongoose');
var reload        = require('reload');
var favicon 	  = require('serve-favicon')
var passport      = require('passport');
var flash         = require('connect-flash');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var bp            = require('body-parser');
var app           = express();

//Database & Routes Files
var crud          = require('./Database/data.js');
var routes        = require('./Routes/route.js');

//mongoose connections
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/Data", {
	   useMongoClient: true
});

//middleware 
app.use(morgan("dev"))
app.use(flash());
app.use(bp.json());
app.use(bp.urlencoded({extended : true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(session({
	
	    secret: "secure",
	    resave: true,
	    saveUninitialized: true
}));

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