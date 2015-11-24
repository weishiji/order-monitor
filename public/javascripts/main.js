var socket = io('http://localhost:3000');
var $canvas = $('canvas');

var orderNumCtx = $canvas.get(0).getContext('2d')
	,orderPriceCtx = $canvas.get(1).getContext('2d')
function resizeCanvas() {
	$canvas.each(function(i,can){
		can.style.width = window.innerWidth/2 + "px";
	  // artifical delay so innerHeight is correct
	  setTimeout(function() {
	    can.style.height = window.innerHeight/2 + "px";
	  }, 0);	
	});
};
resizeCanvas();
window.onresize = resizeCanvas;



socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});	

var data = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [65,59,90,81,56,55,40]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			data : [28,48,40,19,96,27,100]
		}
	]
}


new Chart(orderNumCtx).Line(data);