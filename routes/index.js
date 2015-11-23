var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('../config')

var connection = mysql.createConnection(config.db);
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('index', { title: 'Powered By Wang Chi' });
});

module.exports = router;
