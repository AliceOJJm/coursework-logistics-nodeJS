/**
 * Created by acer on 24.04.2015.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;