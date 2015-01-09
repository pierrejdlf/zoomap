var myformatter = function(feature) {
	var p = feature.properties;
	var o = '<div id="">AH ! '+p.title+" "+p.description+'</div>';
	return '';
};








var buildTimeline = function(divid,data,siz) {	
	console.log("Building timeline with size:"+siz);
	console.log(data);
	
	var width = siz[0];
	var height = siz[1];
	
	var x = d3.time.scale().range([0, width]);
	
	var brush = d3.svg.brush()
		.x(x)
		.on("brush", brush);

	//var parseDate = d3.time.format("%Y %d").parse;
	//data.forEach(function(d) { d.date = parseDate(d.date);});
	
	var svg = d3.select("#"+divid).append("svg")
		.attr("width", width)
		.attr("height", height+25);
	
	// scales & axes
	x.domain(d3.extent(data.map(function(d) { return d.date; })));
	//x.domain([new Date(2012,12,1),new Date(2013,1,30)])
	
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("top")
		.tickSubdivide(3)
		.tickSize(5, 3, 1)
		.ticks(30)
		.tickFormat(d3.time.format("%d"));
	var xAxis2 = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.ticks(5)
		//.tickSize(20)
		.tickFormat(d3.time.format("%b"));
	svg.append("g").attr("class", "axis d")
		.attr("transform", "translate(0,"+height+")")
		.call(xAxis);
	svg.append("g").attr("class", "axis m")
		.attr("transform", "translate(0,"+height+")")
		.call(xAxis2);
		
	svg.append("svg").selectAll("bubs")
		.data(data)
			.enter().append("svg:circle")
		.attr("cx",function(d){
			//console.log(d.date);
			return x(d.date);
		})
		.attr("cy",20)
		.attr("r",4)
		.on("mouseover",function(d){
			console.log("Timeline over:"+d.id);
		});
	
				
/*
	var context = svg.append("g");
	context.append("g")
		.attr("class", "x brush")
		.call(brush)
			.selectAll("rect")
		.attr("y", 12)
		.attr("height", height);
	
	function brush() {
		//x.domain(brush.empty() ? x2.domain() : brush.extent());
		//focus.select("path").attr("d", area);
		//focus.select(".x.axis").call(xAxis);
	}
*/
};