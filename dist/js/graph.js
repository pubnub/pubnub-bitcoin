(function(){
var svg  = d3.select("#chart-graph");
var x    = d3.time.scale().range([0, 1140]);
var y    = d3.scale.linear().range([280, 0]);
var area = d3.svg.area()
    .x(function(d)  { return x(d.date); })
    .y0(100)
    .y1(function(d) { return y(d.close); });

function add_points(data) {
  data.forEach(function(d) {
    d.date  = d3.time.format("%d-%b-%y").parse(d[0]);
    d.close = +d[1];
  });

  x.domain(d3.extent(  data, function(d) { return d.date  }));
  y.domain([0, d3.max( data, function(d) { return d.close })]);

  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);
}

add_points(
    PUBNUB.$('tsv')
    .innerHTML.split(/\n+/)
    .filter(function(d){ return d })
    .map(function(d){ return d.split(/\s+/) })
);

var month_name = [ "Jan", "Feb", "Mar", "Apr", "May",
                    "Jun", "Jul", "Aug", "Sep", "Oct",
                    "Nov", "Dec" ];

PUBNUB.events.bind( 'ticker.HISTORY', function(data) {
    var date = new Date(data.day);
    add_points(
        [[
            date.getDate()              + "-" +
            month_name[date.getMonth()] + "-" +
            date.getUTCFullYear() % 2000,
            +data.data.ticker.avg.value
        ]]
    );
} );




})();
