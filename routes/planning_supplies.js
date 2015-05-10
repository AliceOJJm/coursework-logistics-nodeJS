/**
 * Created by acer on 26.04.2015.
 */
var express = require('express');
var router = express.Router();
var Operation = require('../models/operation');

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
    Operation.create({type: "planning", parameters: req.body.params, results: req.body.results, additional: req.body.additional, firm_id: req.user._id}, function (err) {
        if (err) return handleError(err);
    });
    res.end("yes");
});

router.get('/about', function(req, res, next) {
    res.render('about_planning_supplies', {
        firm : req.user// get the user out of session and pass to template
    });
});

module.exports = router;
