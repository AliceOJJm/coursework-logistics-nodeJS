/**
 * Created by acer on 27.04.2015.
 */
var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({
    title :{ type : String, unique: true, required : true},
    tax   :{ type : Number, required : true },
    railway_tax   :{ type : Number, required : true }
});

module.exports = mongoose.model('Country', countrySchema);