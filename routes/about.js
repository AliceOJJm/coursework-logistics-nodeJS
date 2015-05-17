/**
 * Created by acer on 21.04.2015.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('about', {
        firm : req.user
    });
});

module.exports = router;
