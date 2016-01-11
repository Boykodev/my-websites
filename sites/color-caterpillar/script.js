var width = $(window).width(),
      height = $(window).height();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.on('mouseover', function () {

  var coordinates = d3.mouse(this);

  svg.append("circle")
    .attr("cx", coordinates[0])
    .attr("cy", coordinates[1])
    .attr("r", 80)
     .attr("stroke", '#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .attr("stroke-width", 10)
    .attr("fill", '#'+(Math.random()*0xFFFFFF<<0).toString(16))
    .attr("opacity", 0.5)
    .transition().duration(2000)
      .attr("r", 1)
      .remove();
});