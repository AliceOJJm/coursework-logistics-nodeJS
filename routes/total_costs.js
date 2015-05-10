/**
 * Created by acer on 26.04.2015.
 */
var express = require('express');
var router = express.Router();
var Operation = require('../models/operation');

router.get('/', function(req, res, next) {
    res.render('total_costs', {
        firm : req.user  // get the user out of session and pass to template
    });
});

router.post('/', function(req, res) {
    Operation.create({type: "total", parameters: req.body.params, results: req.body.results, additional: req.body.additional, firm_id: req.user._id}, function (err) {
        if (err) return handleError(err);
    });
    res.end("yes");
});

module.exports = router;
