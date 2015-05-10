/**
 * Created by acer on 26.04.2015.
 */
var express = require('express');
var router = express.Router();
var Operation = require('../models/operation');
var Firm = require('../models/firm');

router.get('/', function(req, res, next) {
    res.render('total_costs', {
        firm : req.user  // get the user out of session and pass to template
    });
});

router.post('/', function(req, res) {
    Operation.create({type: "total", parameters: req.body.params, results: req.body.results, additional: req.body.additional, firm_id: req.user._id}, function (err) {
        if (err) return handleError(err);
        var query = {};
        query['local.operations'] = req.user.local.operations + 1;
        console.log(query);
        Firm.update({_id: req.user._id}, query, function (err) {
            res.end("yes");
        });
    });
});

module.exports = router;
