/**
 * Created by acer on 24.04.2015.
 */

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var firmSchema = mongoose.Schema({

    local            : {
        email               :{ type : String, unique: true, required : true },
        password            :{ type : String, required : true },
        title               :{ type : String, required : true },
        line                :{ type : String, required : true },
        registration_number :{ type : String, required : true },
        proxy               :{ type : String, required : true },
        phone               :{ type : String, required : true },
        fax                 :{ type : String},
        headquarters        :{ type : String, required : true },
        is_admin            :{ type : Boolean, default : false },
        description         :{ type : String}
    }
});

// methods ======================
// generating a hash
firmSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
firmSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Firm', firmSchema);