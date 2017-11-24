var socket = io('http://' + window.location.host);
var $canvas = $('canvas');
var maxs = {
	0:50,
	1:20,
	2:15,
	3:15,
};

require.config({
	paths: {
      echarts: '/bower_components/echarts/build/dist'
  }
})


// require([
// 	'echarts'
// 	,'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
// 	,'echarts/chart/line'
// ],function(ec){
// 	var myChart = ec.init(document.getElementById('order-average'));
//  	var option = {
//     tooltip: {
//       show: true
//     },
//     legend: {
//       data:['畅销商品']
//     },
//     xAxis : [{
//       type : 'category',
//       data : undefined
//     }],
//     yAxis : [{
//       type : 'value'
//     }],
//     series : [{
//       "name":"销量",
//       "type":"bar",
//       "data":undefined
//     }]
//   };
//   option = {
//     title : {
//       text: '设计师销量前五位（单位:$）',
//       subtext: 'Power By Chicv Tech'
//     },
//     tooltip : {
//       trigger: 'axis'
//     },
//     legend: {
//       data:['']
//     },
//     toolbox: {
//       show : true,
//       feature : {
//           restore : {show: true},
//           saveAsImage : {show: true}
//       }
//     },
//     calculable : true,
//     xAxis : [{
//       type : 'value'
//     }],
//     yAxis : [{
// 			type : 'category',
//       data : undefined
//     }],
//     series : [{
//       name:'销量',
//       type:'bar',
//       data:undefined
//     }]
// };
//
// 	socket.on('sellWell', function (data) {
// 	  option.yAxis[0].data = [];
// 	  option.series[0].data = [];
// 	  if(!data) return;
//       for(var i=0;i<data.length;i+=1){
// 	 		var temp = data[i];
// 	 		option.yAxis[0].data.unshift(temp.name);
// 	 		option.series[0].data.unshift(temp.m_total);
// 	 	}
// 	 	//option.yAxis[0].data.sort(function(a,b){return a - b});
// 	 	//option.series[0].data.sort(function(a,b){return a - b});
// 	 	myChart.setOption(option);
// 	});
// })
// require([
// 	'echarts'
// 	,'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
// 	,'echarts/chart/line'
// ],function(ec){
// 	var myChart = ec.init(document.getElementById('hot-sold'));
//   var option = {
//     title : {
//       text: '爆款产品前五位（单位:$）',
//       subtext: 'Power By Chicv Tech'
//     },
//     tooltip : {
//       trigger: 'axis'
//     },
//     legend: {
//       data:['']
//     },
//     toolbox: {
//       show : true,
//       feature : {
//           restore : {show: true},
//           saveAsImage : {show: true}
//       }
//     },
//     calculable : true,
//     xAxis : [{
//       type : 'value'
//     }],
//     yAxis : [{
// 			type : 'category',
//       data : undefined
//     }],
//     series : [{
//       name:'销量',
//       type:'bar',
//       data:undefined
//     }]
// };
//
// 	socket.on('hotSold', function (data) {
// 	  option.yAxis[0].data = [];
// 	  option.series[0].data = [];
//       if(!data) return;
// 	  for(var i=0;i<data.length;i+=1){
// 	 		var temp = data[i];
// 	 		option.yAxis[0].data.unshift(temp.product_id);
// 	 		option.series[0].data.unshift(temp.p_total);
// 	 	}
// 	 	//option.yAxis[0].data.sort(function(a,b){return a - b});
// 	 	//option.series[0].data.sort(function(a,b){return a - b});
// 	 	myChart.setOption(option);
// 	});
// })


require([
	'echarts'
	,'echarts/chart/gauge' // 使用仪表盘就加载gauge模块，按需加载
],function(ec){
	var charts = {};
	$('.gauge').each(function(index,element){
		var siteId = $(element).attr('site-id');
			charts[siteId]={};
		  charts[siteId]['chart']  = ec.init(element);
			var MAX = maxs[siteId];
	  	charts[siteId]['option'] = {
	      tooltip: {
	          formatter: "{a} <br/>{b} : {c}%"
	      },
	      title: {
	          text: '总订单（单位:万$）',
	          subtext: 'Power By Chicv Tech'
	      },
	      legend: {
		      data:['目标：$' + MAX + 'W']
		    },
	      toolbox: {
	          show: true,
	          feature: {
	              mark: {
	                  show: true
	              },
	              restore: {
	                  show: true
	              },
	              saveAsImage: {
	                  show: true
	              }
	          }
	      },
	      series: [{
	          name: '业务指标',
	          type: 'gauge',
	          startAngle: 180,
	          endAngle: 0,
	          center: ['50%', '100%'], // 默认全局居中
	          radius: 200,
	          axisLine: { // 坐标轴线
	              lineStyle: { // 属性lineStyle控制线条样式
	                  width: 200
	              }
	          },
	          axisTick: { // 坐标轴小标记
	              splitNumber: 10, // 每份split细分多少段
	              length: 12, // 属性length控制线长
	          },
	          axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
	              formatter: function(v) {
	                  switch (v + '') {
	                      case '20':
	                          return (20/100 * MAX).toFixed(1);
	                      case '50':
	                          return (50/100 * MAX).toFixed(1);
	                      case '80':
	                          return (80/100 * MAX).toFixed(1);
	                      case '100':
	                          return (100/100 * MAX).toFixed(1);
	                      default:
	                          return '';
	                  }
	              },
	              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                  color: '#fff',
	                  fontSize: 15,
	                  fontWeight: 'bolder'
	              }
	          },
	          pointer: {
	            width: 50,
	            length: '90%',
	            color: 'rgba(255, 255, 255, 0.8)'
	          },
	          title: {
	            show: true,
	            offsetCenter: [0, '-60%'], // x, y，单位px
	            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                color: '#fff',
	                fontSize: 30
	            }
	          },
	          detail: {
	            show: true,
	            backgroundColor: 'rgba(0,0,0,0)',
	            borderWidth: 0,
	            borderColor: '#ccc',
	            width: 100,
	            height: 40,
	            offsetCenter: [0, -40], // x, y，单位px
	            formatter: '{value}%',
	            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                fontSize: 50
	            }
	          },
	          data: [{
	              value: 50,
	              name: '完成率'
	          }]
	      }]
	  };
	});
	var gauges={};
  $('.order-all').each(function(index,element){
		var $self = $(element);
		var siteId = $self.attr('site-id');
		gauges[siteId]={};

		$self.css('line-height',$self.height() + 'px')
		var options = { 
		    useEasing: true,
		    useGrouping: true,
		    separator: ',',
		    decimal: '.',
		    prefix: '$',
		    suffix: ''
		  };
	  gauges[siteId]['countup'] = new CountUp($self.find('span')[0], 0, 0, 2, 2.5, options);
	  gauges[siteId]['diffValue']  = 0;
		gauges[siteId]['diff']  = $('');
		gauges[siteId]['countup'].start(function(){
			gauges[siteId]['diff'].remove();
		});

	});
  	socket.on('soldAll',function(data){
			console.log(data);
		var total = 0;
		data.map(function(v){
				total+=v.sold_total;
		});
		data.push({
			site_id:0,
			sold_total:total
		})
		data.map(function(v){
			var siteId = v.site_id;
			var MAX = maxs[siteId];
			var orderAll = $('.order-all[site-id='+siteId+']');
				var originValue = orderAll.find('span').html().split(',').join('').substr(1) - 0
				var all = v.sold_total;
				diffValue = all - originValue;
				if(diffValue === 0){
						// gauges[siteId]['diff'] = $('<div/>',{
				    //           'style' : 'position:absolute;top:0;text-align:center;color:green;'
				    //          }).html('$' + diffValue).appendTo(orderAll)
				}
				charts[siteId]['option'].series[0].data[0].value = (all / MAX / 10000 * 100) .toFixed(2) - 0;
		    charts[siteId]['chart'].setOption(charts[siteId]['option'],true);
		    gauges[siteId]['countup'].update(all);
		});
	})

})
