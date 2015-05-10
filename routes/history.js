/**
 * Created by acer on 28.04.2015.
 */
var express = require('express');
var router = express.Router();
var Operation = require('../models/operation');

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get('/', isLoggedIn, function(req, res) {
    Operation.find({firm_id: req.user._id}).sort('-_id').exec(function(err, operations){
        var total = [];
        var planning = [];
        var transportation = [];
        for (var counter = 0; counter < operations.length; counter ++){ if(operations[counter].type == "total"){
            total.push(operations[counter]);
        }}
        for (var counter = 0; counter < operations.length; counter ++){ if(operations[counter].type == "planning"){
            planning.push(operations[counter]);
        }}
        for (var counter = 0; counter < operations.length; counter ++){ if(operations[counter].type == "transportation"){
            transportation.push(operations[counter]);
        }}
        res.render('history', {
            firm : req.user, // get the user out of session and pass to template
            total : total,
            transportation: transportation,
            planning: planning
        });
    });
});

router.delete('/', isLoggedIn, function(req, res){
    Operation.remove({firm_id: req.user._id},function(err){
        res.end("yes");
    });
});

router.post('/', isLoggedIn, function(req, res){
    Operation.remove({_id: req.body.id},function(err){
        res.end("yes");
    });
});

module.exports = router;