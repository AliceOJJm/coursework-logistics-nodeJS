/**
 * Created by acer on 11.05.2015.
 */
/**
 * Created by acer on 27.04.2015.
 */
var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    title       :{ type : String, unique: true, required : true},
    author      :{ type : String, required : true },
    text        :{ type : String, required : true },
    url        :{ type : String, required : false },
    updated_at  :{ type: Date, default: Date.now, required : true }
});

module.exports = mongoose.model('Item', itemSchema);