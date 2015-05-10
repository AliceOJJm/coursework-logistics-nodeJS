/**
 * Created by acer on 21.04.2015.
 */
var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('about', {
        firm : req.user  // get the user out of session and pass to template
    });
});

module.exports = router;
