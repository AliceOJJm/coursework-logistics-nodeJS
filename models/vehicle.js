/**
 * Created by acer on 02.05.2015.
 */
var mongoose = require('mongoose');

var vehicleSchema = mongoose.Schema({
    type         :{ type : String, required : true},
    title        :{ type : String, required : true},
    capacity     :{ type : Number, required : true},
    cargo_volume :{ type : Number, required : true},
    cargo_type   :{ type : String, required : true},
    tax_addon    :{ type : Number, required : true},
    additional   :{ type : String}
});

module.exports = mongoose.model('Vehicle', vehicleSchema);