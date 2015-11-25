var socket = io('http://localhost:3000');
var $canvas = $('canvas');

require.config({
	paths: {
      echarts: '/bower_components/echarts/build/dist'
  }
})


require([
	'echarts'
	,'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
	,'echarts/chart/line'
],function(ec){
	var myChart = ec.init(document.getElementById('order-average')); 
 	var option = {
    tooltip: {
      show: true
    },
    legend: {
      data:['畅销商品']
    },
    xAxis : [{
      type : 'category',
      data : undefined
    }],
    yAxis : [{
      type : 'value'
    }],
    series : [{
      "name":"销量",
      "type":"bar",
      "data":undefined
    }]
  };
  option = {
    title : {
      text: '衣服销量前五位',
      subtext: 'Power By Wangchi'
    },
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data:[new Date()]
    },
    toolbox: {
      show : true,
      feature : {
          restore : {show: true},
          saveAsImage : {show: true}
      }
    },
    calculable : true,
    xAxis : [{
      type : 'value'
    }],
    yAxis : [{
			type : 'category',
      data : undefined
    }],
    series : [{
      name:'销量',
      type:'bar',
      data:undefined
    }]
};
                    
	socket.on('sellWell', function (data) {
	  option.yAxis[0].data = [];
	  option.series[0].data = [];
	 	for(var i=0;i<data.length;i+=1){
	 		var temp = data[i];
	 		option.yAxis[0].data.push(temp.product_id);
	 		option.series[0].data.push(temp.total_quantity);
	 	}
	  // 为echarts对象加载数据 
	 	myChart.setOption(option);
	 	setTimeout(function(){
	 		socket.emit('sellWellSuccess', { loop : true });	
	 	},10000)
	 	
	});	
  

})