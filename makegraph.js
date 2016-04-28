var focus_node = null, highlight_node = null;

function makegraphs(filter, filename){
  
d3.selectAll('#svg1').remove();
d3.selectAll('#svg2').remove();
d3.selectAll('#svg3').remove();
d3.selectAll('#svg4').remove();
var width = (window.innerWidth /12) *5-20,
    height = window.innerHeight/2.2 - 20;
var delx = width/2,
    dely = height/2+30,
    k = height/180;
var deltax = [0, 1, 1, 1];
var deltay = [0, 1, 1, 1];
var ddx = [0, width/5, width/5, width/1.8];
var ddy = [0, height/1.4, height/2.8, height/3.8];
var color = d3.scale.category10();
var colors = ["","#3182bd", "#ad494a","#74c476"];
var colors2 = ["","#3182bd","#756bb1","#9edae5","#ad494a","","#fd8d3c","","","#74c476"];

/* --------------- graph1 --------------- */

var force1 = d3.layout.force()
    .linkStrength(0.001)
    .charge(-120)
    .linkDistance(120)
    .size([width, height]);

var svg1 = d3.select(".wrapper").append("svg")
    .attr("id","svg1")
    .attr("width", width)
    .attr("height", height);

d3.json(filename, function(error, graph) {
  if (error) throw error;
  
  force1
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var gnodes1 = svg1.selectAll('g.gnode')
  .data(graph.nodes)
  .enter()
  .append('g')
  .classed('gnode', true);
  
  var link1 = svg1.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .filter(function(d){return d.value>filter;})
      .attr("class", "link")
      .style("stroke",function(d) { return colors2[(d.source.group)*(d.target.group)]; })
      .style("opacity",0.5)
      .style("stroke-width", function(d) { return (d.value-filter)*20; });

  var node1 = gnodes1.append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr("id",function(d){return "node"+d.idd;})
      .style("fill", function(d) { return colors[d.group]; })
      .style("opacity",function(d){return 0.8+d.zz/120})
      .call(force1.drag);
  node1.on("mouseover",function(d){d3.selectAll("#node"+d.idd).attr("r",10);}).on("mousedown",function(d){d3.selectAll("#node"+d.idd).attr("r",10);}).on("mouseout",function(d){d3.selectAll("#node"+d.idd).attr("r",5);});

  node1.append("title")
      .text(function(d) { return d.name; });
      
// Append the labels to each group
var labels1 = gnodes1.append("text")
  .text(function(d) { return d.name; })
  .attr("visibility","visible")
  .attr("class", "labels")
  .attr("x",10)
  .attr("font-size",10);
  
  //.attr("display","none");

  console.log(labels1);
  
  force1.on("tick", function() {
    
    link1.filter(function(d){return d.value>filter;})
        .attr("x1", function(d) { return d.source.xx*k+delx; })
        .attr("y1", function(d) { return d.source.yy*k+dely; })
        .attr("x2", function(d) { return d.target.xx*k+delx; })
        .attr("y2", function(d) { return d.target.yy*k+dely; });
    
    gnodes1.attr("transform", function(d) { return 'translate(' + [d.xx*k+delx, d.yy*k+dely] + ')'; });
    /*node.attr("cx", function(d) { return d.xx*k+del; })
        .attr("cy", function(d) { return d.yy*k+del; });*/
  });
});
d3.select("#svg1").append("text").attr("x",width/2).attr("y",height*0.95+1).style("font-size","12px")/*.style("display","inline")*/.text("x-y Plane");  

/* --------------- graph2 --------------- */

var force2 = d3.layout.force()
    .linkStrength(0.001)
    //.charge(-120)
    //.linkDistance(120)
    .size([width, height]);

var svg2 = d3.select(".wrapper").append("svg")
    .attr("id","svg2")
    .attr("width", width)
    .attr("height", height);

d3.json(filename, function(error, graph) {
  if (error) throw error;
  
  force2
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var gnodes2 = svg2.selectAll('g.gnode')
  .data(graph.nodes)
  .enter()
  .append('g')
  .classed('gnode', true);
  
  var link2 = svg2.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .filter(function(d){return d.value>filter;})
      .attr("class", "link")
      .style("stroke",function(d) { return colors2[(d.source.group)*(d.target.group)]; })
      .style("opacity",0.5)
      .style("stroke-width", function(d) { return (d.value-filter)*20; });

  var node2 = gnodes2.append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr("id",function(d){return "node"+d.idd;})
      .style("opacity",function(d){return 0.9+d.yy/120})
      .style("fill", function(d) { return colors[d.group]; })
      .call(force2.drag);
  
  node2.on("mouseover",function(d){d3.selectAll("#node"+d.idd).attr("r",10);}).on("mousedown",function(d){d3.selectAll("#node"+d.idd).attr("r",10);}).on("mouseout",function(d){d3.selectAll("#node"+d.idd).attr("r",5);});

  node2.append("title")
      .text(function(d) { return d.name; });
  
  // Append the labels to each group
var labels2 = gnodes2.append("text")
  .text(function(d) { return d.name; })
  .attr("x",10)
  .attr("font-size",10)
  .attr("class", "labels");
//.attr("display","none");

  console.log(labels2);

  force2.on("tick", function() {
    
    link2.filter(function(d){return d.value>filter;})
        .attr("x1", function(d) { return d.source.xx*k+delx; })
        .attr("y1", function(d) { return d.source.zz*k+dely; })
        .attr("x2", function(d) { return d.target.xx*k+delx; })
        .attr("y2", function(d) { return d.target.zz*k+dely; });
    
    gnodes2.attr("transform", function(d) { return 'translate(' + [d.xx*k+delx, d.zz*k+dely] + ')'; });
    
    /*node2.attr("cx", function(d) { return d.xx*k+del; })
        .attr("cy", function(d) { return d.zz*k+del; });*/
  });
});
d3.select("#svg2").append("text").attr("x",width/2).attr("y",height*0.95+1).style("font-size","12px")/*.style("display","inline")*/.text("x-z Plane");

/* --------------- graph3 --------------- */

var force3 = d3.layout.force()
    .linkStrength(0.001)
    //.charge(-120)
    //.linkDistance(120)
    .size([width, height]);

var svg3 = d3.select(".wrapper").append("svg")
    .attr("id","svg3")
    .attr("width", width)
    .attr("height", height);

d3.json(filename, function(error, graph) {
  if (error) throw error;
  
  force3
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var gnodes3 = svg3.selectAll('g.gnode')
  .data(graph.nodes)
  .enter()
  .append('g')
  .classed('gnode', true);
  
  var link3 = svg3.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .filter(function(d){return d.value>filter;})
      .attr("class", "link")
      .style("stroke",function(d) { return colors2[(d.source.group)*(d.target.group)]; })
      .style("opacity",0.5)
      .style("stroke-width", function(d) { return (d.value-filter)*20; });

  var node3 = gnodes3.append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("opacity",function(d){return 0.8+d.xx/150})
      .attr("id",function(d){return "node"+d.idd;})
      .style("fill", function(d) { return colors[d.group]; })
      .call(force3.drag);
  node3.on("mouseover",function(d){d3.selectAll("#node"+d.idd).attr("r",10);}).on("mousedown",function(d){d3.selectAll("#node"+d.idd).attr("r",10);}).on("mouseout",function(d){d3.selectAll("#node"+d.idd).attr("r",5);});

  node3.append("title")
      .text(function(d) { return d.name; });
  
    // Append the labels to each group
var labels3 = gnodes3.append("text")
  .text(function(d) { return d.name; })
  .attr("x",10)
  .attr("font-size",10)
  .attr("class", "labels");
//.attr("display","none");

  console.log(labels3);
      
  force3.on("tick", function() {
    
    link3.filter(function(d){return d.value>filter;})
        .attr("x1", function(d) { return d.source.yy*k+delx; })
        .attr("y1", function(d) { return d.source.zz*k+dely; })
        .attr("x2", function(d) { return d.target.yy*k+delx; })
        .attr("y2", function(d) { return d.target.zz*k+dely; });
    
    gnodes3.attr("transform", function(d) { return 'translate(' + [d.yy*k+delx, d.zz*k+dely] + ')'; });
    
    /*node3.attr("cx", function(d) { return d.yy*k+del; })
        .attr("cy", function(d) { return d.zz*k+del; });*/
  });
});
d3.select("#svg3").append("text").attr("x",width/2).attr("y",height*0.95+1).style("font-size","12px")/*.style("display","inline")*/.text("y-z Plane");

/* --------------- graph4 --------------- */


var force4 = d3.layout.force()
    .linkStrength(0.0001)
    .charge(-200)
    .linkDistance(120)
    .friction(.2)
    .gravity(.5);
    //.size([width, height]);

var svg4 = d3.select(".wrapper").append("svg")
    .attr("id","svg4")
    .attr("width", width)
    .attr("height", height);

d3.json(filename, function(error, graph) {
  if (error) throw error;

  force4
      .nodes(graph.nodes)
      .links(graph.links)
      .start();
      
  var gnodes4 = svg4.selectAll('g.gnode')
  .data(graph.nodes)
  .enter()
  .append('g')
  .classed('gnode', true);
  
  var link4 = svg4.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .filter(function(d){return d.value>filter;})
      .attr("class", "link")
      .style("stroke",function(d) { return colors2[(d.source.group)*(d.target.group)]; })
      .style("opacity",0.5)
      .style("stroke-width", function(d) { return (d.value-filter)*20;});

  var node4 = gnodes4.append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .attr("id",function(d){return "node"+d.idd;})
      .style("fill", function(d) { return colors[d.group]; })
      .call(force4.drag);
  
  node4.on("mouseover",function(d){d3.selectAll("#node"+d.idd).attr("r",10);}).on("mousedown",function(d){d3.selectAll("#node"+d.idd).attr("r",10);}).on("mouseout",function(d){d3.selectAll("#node"+d.idd).attr("r",5);});

  node4.append("title")
      .text(function(d) { return d.name; });
 
  // Append the labels to each group
var labels4 = gnodes4.append("text")
  .text(function(d) { return d.name; })
  .attr("x",10)
  .attr("font-size",10)
  .attr("class", "labels")
  .attr("visibility","visible");

  console.log(labels4);
    
  force4.on("tick", function() {
    
    link4.filter(function(d){return d.value>filter;})
        .attr("x1", function(d) { return d.source.x+ddx[d.source.group]; })
        .attr("y1", function(d) { return d.source.y+ddy[d.source.group]; })
        .attr("x2", function(d) { return d.target.x+ddx[d.target.group]; })
        .attr("y2", function(d) { return d.target.y+ddy[d.target.group]; });
    
    gnodes4.attr("transform", function(d) { return 'translate(' + [d.x+ddx[d.group], d.y+ddy[d.group]] + ')'; });
    /*node4.attr("cx", function(d) { return deltax[d.group]*d.x+ddx[d.group]; })
         .attr("cy", function(d) { return deltay[d.group]*d.y+ddy[d.group]; });*/
  });//.alpha(1);
});
d3.select("#svg4").append("text").attr("x",width/2).attr("y",height*0.95+1).style("font-size","12px")/*.style("display","inline")*/.text("x-y Plane");
}
d3.select(".node")