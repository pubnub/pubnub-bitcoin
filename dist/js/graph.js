(function(){

function add_points(data) {
  data.forEach(function(d) {
    d.date  = +d[0];
    d.close = +d[1];
  });

    PUBNUB.$('chart-graph').innerHTML = '';
    var svg  = d3.select("#chart-graph").append("svg").attr("width", window.innerWidth).attr("height",window.innerHeight);
    var x    = d3.scale.linear().range([0,1140]);
    var y    = d3.scale.linear().range([1000, 0]);
    var area = d3.svg.area()
        .x(function(d)  { return x(d.date); })
        .y0(100)
        .y1(function(d) { return y(d.close); });

  x.domain([0, d3.max( data, function(d) { return d.date  })]);
  y.domain([0, d3.max( data, function(d) { return d.close })]);

  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);
}

0&&add_points(
    PUBNUB.$('tsv')
    .innerHTML.split(/\n+/)
    .filter(function(d){ return d })
    .map(function(d){ return d.split(/\s+/) })
);

var month_name = [ "Jan", "Feb", "Mar", "Apr", "May",
                    "Jun", "Jul", "Aug", "Sep", "Oct",
                    "Nov", "Dec" ];

PUBNUB.events.bind( 'ticker.HISTORY', function(data) {
    add_points(data);
} );




})();
