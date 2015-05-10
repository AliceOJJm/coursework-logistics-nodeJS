/**
 * Created by acer on 24.04.2015.
 */
var express = require('express');
var router = express.Router();
var Firm = require('../models/firm');

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get('/', isLoggedIn, function(req, res) {
    res.render('profile', {
        firm : req.user  // get the user out of session and pass to template
    });
});


router.put('/', isLoggedIn, function(req, res) {
    var key = "local." + req.body.name;
    var value = req.body.value;
    var query = {};
    query[key] = value;
    Firm.update({_id: req.body.pk}, query, function(err){
        res.end("yes");
    });
});

module.exports = router;