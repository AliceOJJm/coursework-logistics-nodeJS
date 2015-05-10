/**
 * Created by acer on 26.04.2015.
 */
var express = require('express');
var router = express.Router();
var Country = require('../models/country');
var City = require('../models/city');
var Operation = require('../models/operation');
var Vehicle = require('../models/vehicle');
var Product = require('../models/product');
var Firm = require('../models/firm');
var Transaction = require('../models/Transaction');

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/transportation/about');
}

router.get('/', isLoggedIn, function(req, res, next) {
    Country.find(function(err, countries){
        City.find(function(err, cities){
            Product.find(function(err, products){
                res.render('transportation', {
                    firm : req.user,
                    countries: countries,
                    cities : cities,
                    products: products
                });
            });
        });
    });
});

router.post('/', isLoggedIn, function(req, res, next) {
    var transaction = new Transaction("transportation");
    transaction.transportationCosts(req.body, req.user, function(result){
        res.send(result);
    });
});

router.get('/about', function(req, res, next) {
    res.render('about_transportation', {
        firm : req.user,
    });
});

module.exports = router;
