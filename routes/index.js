var express = require('express');
var router = express.Router();
var exec = require('../server/db');

/* GET home page. */
router.get('/', function(req, res, next) {
	exec('select * from oc_product where product_id=?'[100],function(err,rows){
		console.log(rows);
	})
	res.render('index', { title: 'Powered By Wang Chi' });
});

module.exports = router;
