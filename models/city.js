/**
 * Created by acer on 27.04.2015.
 */
var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    title      :{ type : String, unique: true, required : true},
    country_id :{ type : mongoose.Schema.Types.ObjectId, required : true }
});

module.exports = mongoose.model('City', citySchema);