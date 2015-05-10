/**
 * Created by acer on 03.05.2015.
 */

var express = require('express');
var router = express.Router();
var Operation = require('../models/operation');
var Firm = require('../models/firm');
var Vehicle = require('../models/vehicle');
var Product = require('../models/product');

function isAdmin(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.local.is_admin)
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get('/', isAdmin, function(req, res) {
    res.render('content_management', {
        firm : req.user
    });
});

router.get('/cargo', isAdmin, function(req, res) {
    Product.find({}).sort('-_id').exec(function(err, products) {
        res.render('cargo_management', {
            firm : req.user,
            products: products
        });
    });
});

router.delete('/cargo', isAdmin, function(req, res) {
    Product.remove({_id: req.body.id},function(err){
        res.end("yes");
    });
});

router.put('/cargo', isAdmin, function(req, res) {
    var key = req.body.name;
    var value = req.body.value;
    var query = {};
    query[key] = value;
    Product.update({_id: req.body.pk}, query, function(err){
        res.end("yes");
    });
});

router.post('/cargo', isAdmin, function(req, res) {
    Product.create(req.body, function(err){
        res.end("yes");
    });
});

router.get('/transport', isAdmin, function(req, res) {
    Vehicle.find({}).sort('-_id').exec(function(err, vehicles) {
        res.render('transport_management', {
            firm : req.user,
            vehicles: vehicles
        });
    });
});

router.delete('/transport', isAdmin, function(req, res){
    Vehicle.remove({_id: req.body.id},function(err){
        res.end("yes");
    });
});

router.post('/transport', isAdmin, function(req, res) {
    Vehicle.create(req.body, function(err){
        res.end("yes");
    });
});

router.put('/transport', isAdmin, function(req, res) {
    var key = req.body.name;
    var value = req.body.value;
    var query = {};
    query[key] = value;
    Vehicle.update({_id: req.body.pk}, query, function(err){
        res.end("yes");
    });
});


router.get('/firms', isAdmin, function(req, res) {
    res.render('firms_management', {
        firm : req.user // get the user out of session and pass to template
    });
});

router.get('/chart_data', isAdmin, function(req, res) {
    Operation.find().exec(function(err, operations){
        var result = [];
        var users_result = [];
        var date;
        for (var counter = 0; counter < operations.length; counter ++){
            date = new Date (operations[counter].created_at);
            date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
            var found = 0;
            for (var rcount = 0; rcount < result.length; rcount ++){
                if(result[rcount].time == date){
                    found ++;
                    result[rcount][operations[counter].type]++;
                    break;
                }
            }
            if(found == 0){
                var new_obj = {};
                new_obj.time = date;
                new_obj.total = 0;
                new_obj.transportation = 0;
                new_obj.planning = 0;
                new_obj[operations[counter].type]++;
                result.push(new_obj);
            }
        }
        Firm.find().exec(function(err, firms){
            for (var counter = 0; counter < firms.length; counter ++) {
                date = new Date(firms[counter]._id.getTimestamp());
                date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
                var found = 0;
                for (var rcount = 0; rcount < users_result.length; rcount ++){
                    if(users_result[rcount].users_time == date){
                        found ++;
                        users_result[rcount].users ++;
                        break;
                    }
                }
                if(found == 0){
                    var new_obj = {};
                    new_obj.users_time = date;
                    new_obj.users = 1;
                    users_result.push(new_obj);
                }
            }
            res.send({
                operations_data : result,
                users_data : users_result
            });
        });
    });
});

module.exports = router;