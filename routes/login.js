/**
 * Created by acer on 21.04.2015.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', function(req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.send({message: req.flash('loginMessage')});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/profile');
        });
    })(req, res, next);
});



module.exports = router;
