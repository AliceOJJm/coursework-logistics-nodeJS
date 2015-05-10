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
    Vehicle.find({}).sort('capacity').exec(function(err, vehicles) {
        var weight = parseFloat(req.body.dimensions.split(',')[0]);
        var volume = req.body.dimensions.split(',')[1];
        var counter;
        for(counter = 0; counter < vehicles.length; counter ++){
            if(vehicles[counter].capacity >= weight)
                break;
        }
        if(counter == vehicles.length){
            counter --;
        }
        Country.findOne({title: req.body.origin_country}, function(err, origin_country){
            Country.findOne({title: req.body.destination_country}, function(err, destination_country){
                var tax;
                if(vehicles[counter].type == 'railway'){
                    tax = (origin_country.railway_tax + destination_country.railway_tax)/2 + vehicles[counter].tax_addon;
                }
                else{
                    tax = (origin_country.tax + destination_country.tax)/2 + vehicles[counter].tax_addon;
                }
                var cost = (tax * weight * req.body.distance).toFixed(2);
                var params = " Тип груза: " + req.body.cargo_type + " Вес(кг): " + weight + " Объём(м3): " + volume + " Точка погрузки: " + origin_country.title + ", " + req.body.origin + " Точка отгрузки: " + destination_country.title + ", " + req.body.destination;
                var results = " Тип транспортного средства: " + vehicles[counter].title + " Примерная стоимость перевозки: " + cost + " Длина кратчайшего пути(км): " + req.body.distance;
                Operation.create({type: "transportation", parameters: params, results: results, additional: req.body.additional, firm_id: req.user._id}, function (err) {
                    if (err) return handleError(err);
                });
                res.send({vehicle: vehicles[counter], cost: cost});
            });
        });
    });
});

router.get('/about', function(req, res, next) {
    res.render('about_transportation', {
        firm : req.user,
    });
});

module.exports = router;
