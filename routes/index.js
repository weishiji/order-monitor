var express = require('express');
var router = express.Router();
var io = require('../server/io');

/* GET home page. */
router.get('/', function(req, res, next) {
  
	res.render('index', { title: 'Order Monitor' });
});

module.exports = router;
