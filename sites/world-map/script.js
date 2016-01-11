// The SVG container
var width  = 960,
    height = 550;

var color = d3.scale.category10();

var projection = d3.geo.mercator()
                .translate([480, 300])
                .scale(970);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.zoom()
    .on("zoom", redraw))
    .append("g");

function redraw() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var tooltip = d3.select("#map").append("div")
    .attr("class", "tooltip")
    .classed("hidden", true);

queue()
    .defer(d3.json, "assets/world-50m.json")
    .defer(d3.tsv, "assets/world-country-names.tsv")
    .await(ready);

function ready(error, world, names) {

  var countries = topojson.object(world, world.objects.countries).geometries,
      neighbors = topojson.neighbors(world, countries),
      i = -1,
      n = countries.length;

  countries.forEach(function(d) { 
    var tryit = names.filter(function(n) { return d.id == n.id; })[0];
    if (typeof tryit === "undefined"){
      d.name = "Undefined";
    } else {
      d.name = tryit.name; 
    }
  });

  var country = svg.selectAll(".country").data(countries);
  country
   .enter()
    .insert("path")
    .attr("class", "country")    
      .attr("title", function(d,i) { return d.name; })
      .attr("d", path)
      .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); });

    //Show/hide tooltip
    country
      .on("mousemove", function(d,i) {
        var bodyNode = d3.select('body').node();
        var absoluteMousePos = d3.mouse(bodyNode);

        tooltip
          .style('left', (absoluteMousePos[0] + 10)+'px')
          .style('top', (absoluteMousePos[1] - 15)+'px')
          .style('position', 'absolute') 
          .style('z-index', 1001)
          .classed("hidden", false)
          .html(d.name);
        $('#map').css('cursor', 'pointer');
      })
      .on("mouseout",  function(d,i) {
        tooltip.classed("hidden", true)
        $('#map').css('cursor', 'default');
      });
}