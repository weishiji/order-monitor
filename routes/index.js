var express = require('express');
var router = express.Router();
var io = require('../server/io');
var exec = require('../server/db');

/* GET home page. */
router.get('/', function(req, res, next) {
	exec('select * from oc_product where product_id=?',[100],function(err,rows){
		console.log(rows)
		io.on('connection', function (socket) {
		  socket.emit('news', { hello : rows });
		  socket.on('my other event', function (data) {
		    console.log(data);
		  });
		});
	})
	res.render('index', { title: 'Order Monitor' });
});

module.exports = router;
