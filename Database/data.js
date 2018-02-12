//Modules
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Mongoose schema
var Data = mongoose.Schema({

	   Name     : {type : String}, 
	   Username : {type : String, index: {unique: true}},  
	   Email    : {type : String, index: {unique: true}}, 
	   Password : {type : String},
	   Confirm  : {type : String}
});

Data.methods.generateHash = function(Password) {

	 return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);

}

Data.methods.validPassword = function(Password){
     
     return bcrypt.compareSync(Password, this.Password);
}

var crud = module.exports = mongoose.model("crud", Data);
