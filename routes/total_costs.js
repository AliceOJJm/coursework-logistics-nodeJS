/**
 * Created by acer on 26.04.2015.
 */
var express = require('express');
var router = express.Router();
var Operation = require('../models/operation');
var Firm = require('../models/firm');
var Transaction = require('../models/Transaction');

router.get('/', function(req, res, next) {
    res.render('total_costs', {
        firm : req.user  // get the user out of session and pass to template
    });
});

router.post('/', function(req, res) {
    var transaction = new Transaction("total");
    transaction.totalCosts(req.body, req.user, function(result){
        res.send(result);
    });
});

module.exports = router;
