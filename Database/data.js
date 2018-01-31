//Modules
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Mongoose schema
var Data = mongoose.Schema({

	   Name     : {type : String, required: true}, 
	   Username : {type : String, required: true, index: {unique: true}},  
	   Email    : {type : String, required: true, index: {unique: true}}, 
	   Password : {type : String, required: true}
});

var crud = module.exports = mongoose.model("crud", Data);

//Bcrypt password
module.exports.database = function (data, callback) { 
  var salt =  bcrypt.genSalt(10, function(err, salt) { 
            if (err) throw err;
      var hash = bcrypt.hash(data.Password, salt, function(err, hash) {
	           if (err) throw err;
		         data.Password = hash;
		           data.save(callback);
    });
  });
};

/*module.exports.validPassword = function(Password, callback) {
	bcrypt.compare(Password, hash, function(err, isMatch) {
             if (err) throw err;
                 callback(null, isMatch)
	});
};*/
