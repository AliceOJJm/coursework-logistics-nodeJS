/**
 * Created by acer on 03.05.2015.
 */

var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    type         :{ type : String, required : true},
    title        :{ type : String, required : true},
    dangerous    :{ type : Boolean, required : true, default: false}
});

module.exports = mongoose.model('Product', productSchema);