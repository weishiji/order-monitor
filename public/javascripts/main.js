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
require([
	'echarts'
	,'echarts/chart/gauge' // 使用仪表盘就加载gauge模块，按需加载
],function(ec){
	var myChart = ec.init(document.getElementById('gauge')); 
	option = {
    tooltip : {
      formatter: "{a} <br/>{b} : {c}%"
    },
    title : {
      text: '总订单（单位:万$）',
      subtext: 'Power By Wangchi'
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        restore : {show: true},
        saveAsImage : {show: true}
      }
    },
    series : [{
      name:'业务指标',
      type:'gauge',
      startAngle: 180,
      endAngle: 0,
      center : ['50%', '99%'],    // 默认全局居中
      radius : 300,
      axisLine: {            // 坐标轴线
        lineStyle: {       // 属性lineStyle控制线条样式
          width: 200
        }
      },
      axisTick: {            // 坐标轴小标记
        splitNumber: 10,   // 每份split细分多少段
        length :12,        // 属性length控制线长
      },
      axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
        formatter: function(v){
        	console.log()
          switch (v+''){
              case '20' : return '6';
              case '50': return '15';
              case '80': return '24';
              case '100' : return '30';
              default: return '';
          }
        },
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: '#fff',
            fontSize: 15,
            fontWeight: 'bolder'
        }
	    },
      pointer: {
        width:50,
        length: '90%',
        color: 'rgba(255, 255, 255, 0.8)'
      },
      title : {
          show : true,
          offsetCenter: [0, '-60%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              color: '#fff',
              fontSize: 30
          }
      },
      detail : {
          show : true,
          backgroundColor: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderColor: '#ccc',
          width: 100,
          height: 40,
          offsetCenter: [0, -40],       // x, y，单位px
          formatter:'{value}%',
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontSize : 50
          }
      },
      data:[{value: 50, name: '完成率'}]
  }]
};

myChart.setOption(option,true);
                    
})