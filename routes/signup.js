/**
 * Created by acer on 24.04.2015.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup', { firm : req.user,
                           message: req.flash('signupMessage'),
                           errors: req.flash('validMessage')});
});

router.post('/', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
}));

module.exports = router;

