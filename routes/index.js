var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    firm : req.user  // get the user out of session and pass to template
  });
});

module.exports = router;
