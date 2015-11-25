var express = require('express');
var router = express.Router();
var io = require('../server/io');
var exec = require('../server/db');

/* GET home page. */
router.get('/', function(req, res, next) {
	var sql = 'select count(*) as order_count,sum(op.quantity) as total_quantity,' + 
		' op.product_id as product_id,pd.name as product_name' + 
    ' from oc_order_product op' +
		' inner join oc_paypal_order po on op.order_id = po.order_id and DATE(convert_tz(po.date_added, "UTC", "+8:00"))= ?' + 
    ' inner join oc_product_description pd on pd.product_id = op.product_id' + 
    ' group by op.product_id' + 
    ' order by total_quantity desc' + 
    ' limit 5;'
	exec(sql,['2015-11-19'],function(err,rows){
		io.on('connection',function (socket) {
		  socket.emit('sellWell', rows);
		  socket.on('sellWellSuccess', function (data) {
		  	if(data.loop){
		  		exec(sql,['2015-11-19'],function(err,rows){
			    	socket.emit('sales', rows);
			    })	
		  	}
		  });
		});
	})
	res.render('index', { title: 'Order Monitor' });
});

module.exports = router;
