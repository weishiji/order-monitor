var express = require('express');
var router = express.Router();
var io = require('../server/io');
var exec = require('../server/db');
var dateFormat = require('dateformat');

var timeLoop = 5000;
var currentDate = dateFormat(new Date(),'yyyy-mm-dd');
function getSocket(fun){
	io.on('connection',function(socket){
		if(typeof fun === 'function'){
			fun(socket);
		}
	})
}
/* GET home page. */
router.get('/', function(req, res, next) {
  function sendSellWellData(socket){
  	/*
  	var sql = 'select count(*) as order_count,sum(op.quantity) as total_quantity,' + 
			' op.product_id as product_id,pd.name as product_name' + 
	    ' from oc_order_product op' +
			' inner join oc_paypal_order po on op.order_id = po.order_id and DATE(convert_tz(po.date_added, "UTC", "+8:00"))= ?' + 
	    ' inner join oc_product_description pd on pd.product_id = op.product_id' + 
	    ' group by op.product_id' + 
	    ' order by total_quantity desc' + 
	    ' limit 5;'
    */
    var sql = 'SELECT' +
	    ' m.name as name,' +
	    ' round(sum(op.total), 2) AS m_total' +
			' FROM oc_order o' +
	    ' INNER JOIN oc_paypal_order po' +
      ' ON (o.order_id = po.order_id AND date(convert_tz(po.date_added, "+0:00", "+8:00")) = ?)' +
	    ' INNER JOIN oc_order_product op ON (o.order_id = op.order_id)' +
	    ' INNER JOIN oc_product p ON (op.product_id = p.product_id)' +
	    ' INNER JOIN oc_manufacturer m ON (p.manufacturer_id = m.manufacturer_id)' +
			' GROUP BY m.manufacturer_id' +
			' ORDER BY m_total DESC' +
			' LIMIT 5;' 
  	exec(sql,[currentDate],function(err,rows){
  		socket.emit('sellWell', rows);
  		setTimeout(function(){
  			sendSellWellData(socket)
  		},timeLoop);
  	})
  }
  function sendSoldAllData(socket){
  	var sql = 'select sum(po.total) as sold_total from oc_paypal_order as po' + 
			' where DATE(convert_tz(po.date_added, "+0:00", "+8:00"))=? limit 1;'
		exec(sql,[currentDate],function(err,rows){
			console.log(rows);
			socket.emit('soldAll',rows[0]);
			setTimeout(function(){
				sendSoldAllData(socket);
			},timeLoop);
		})
  }
  function sendHotSoldData(socket){
  	var sql = 'SELECT' + 
	    ' op.product_id,' + 
	    ' pd.name,' + 
	    ' round(sum(op.total), 2) AS p_total' + 
			' FROM oc_order o' + 
	    ' INNER JOIN oc_paypal_order po' + 
	    ' ON (o.order_id = po.order_id AND date(convert_tz(po.date_added, "+0:00", "+8:00")) = ?)' + 
	    ' INNER JOIN oc_order_product op ON (o.order_id = op.order_id)' + 
	    ' INNER JOIN oc_product_description pd on (op.product_id=pd.product_id)' + 
			' GROUP BY op.product_id' + 
			' ORDER BY p_total DESC' + 
			' LIMIT 5;'
		exec(sql,[currentDate],function(err,rows){
			socket.emit('hotSold',rows);
			setTimeout(function(){
				sendHotSoldData(socket);
			},timeLoop);
		})
  }
  getSocket(function(socket){
  	sendSellWellData(socket);
  	sendSoldAllData(socket);
  	sendHotSoldData(socket);
  })

	res.render('index', { title: 'Order Monitor' });
});

module.exports = router;
