/**
 * Created by acer on 26.04.2015.
 */
var express = require('express');
var router = express.Router();
var Operation = require('../models/operation');
var Firm = require('../models/firm');
var Transaction = require('../models/Transaction');

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/planning_supplies/about');
}

router.get('/', isLoggedIn, function(req, res, next) {
    res.render('planning_supplies', {
        firm : req.user  // get the user out of session and pass to template
    });
});

router.post('/', isLoggedIn, function(req, res) {
    var transaction = new Transaction("planning");
    transaction.planningSupplies(req.body, req.user, function(result){
        res.send(result);
    });
});

router.get('/about', function(req, res, next) {
    res.render('about_planning_supplies', {
        firm : req.user// get the user out of session and pass to template
    });
});

module.exports = router;
