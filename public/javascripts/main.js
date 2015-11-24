var socket = io('http://localhost:3000');
var $canvas = $('canvas');

require.config({
	paths: {
      echarts: '/bower_components/echarts/build/dist'
  }
})
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

require([
	'echarts'
	,'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
],function(ec){
	var myChart = ec.init(document.getElementById('order-average')); 
	 var option = {
      tooltip: {
          show: true
      },
      legend: {
          data:['销量']
      },
      xAxis : [
          {
              type : 'category',
              data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              "name":"销量",
              "type":"bar",
              "data":[5, 20, 40, 10, 10, 20]
          }
      ]
  };
  // 为echarts对象加载数据 
  myChart.setOption(option); 
  setInterval(function(){
  	option.series[0].data[0] += 1
  	console.log(option)
  	myChart.setOption(option)
  },1000)
})