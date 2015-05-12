/**
 * Created by acer on 11.05.2015.
 */
var express = require('express');
var router = express.Router();
var Item = require('../models/item');

function isAdmin(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.local.is_admin)
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.get('/', function(req, res, next) {
    Item.find({}).sort('-_id').exec(function(err, news){
        res.render('news', {
            news: news,
            firm: req.user
        });
    });
});

router.post('/', isAdmin, function(req, res) {
    var item = {title: req.body.title, text: req.body.text};
    item['author'] = req.user.local.proxy + " (" + req.user.local.title + ")";
    Item.create(item, function(err){
        res.end("yes");
    });
});

router.put('/', isAdmin, function(req, res) {
    var item = {title: req.body.title, text: req.body.text};
    Item.update({_id: req.body.id}, item, function(err){
        res.end("yes");
    });
});

router.delete('/', isAdmin, function(req, res) {
    Item.remove({_id: req.body.id},function(err){
        res.end("yes");
    });
});

module.exports = router;
