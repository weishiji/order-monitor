var express = require('express');
var router = express.Router();
var io = require('../server/io');


function getSocket(fun){
	io.on('connection',function(socket){
		if(typeof fun === 'function'){
			fun(socket);
		}
	})
}
/* GET home page. */
router.get('/', function(req, res, next) {
  
	res.render('index', { title: 'Order Monitor' });
});

module.exports = router;
