/**
 * Created by acer on 30.04.2015.
 */
var mongoose = require('mongoose');

var operationSchema = mongoose.Schema({
    type       :{ type : String, required : true},
    parameters :{ type : String, required : true},
    firm_id    :{ type : mongoose.Schema.Types.ObjectId, required : true},
    results    :{ type : String, required : true},
    additional :{ type : String},
    created_at :{ type: Date, default: Date.now, required : true }
});

module.exports = mongoose.model('Operation', operationSchema);