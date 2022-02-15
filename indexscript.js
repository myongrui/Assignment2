
const api = 'https://corona.lmao.ninja/v2/historical/all?lastdays=365';

document.addEventListener("DOMContentLoaded", function(event) {
fetch(api)
    .then(function(response) { return response.json(); })
    .then(function(data) {
        var parsedData = parseData(data);
        drawChart(parsedData);
         
    })
    .catch(function(err) { console.log(err); })
});

function parseData(data) {
    var arr = [];
    for (var i in data.cases) {
        arr.push({
            date: new Date(i), 
            value: +data.cases [i] 
        });
    }
    return arr;
}
/*
function drawChart(data) {
var svgWidth = 750, svgHeight = 750;
var margin = { top: 30, right: 20, bottom: 30, left: 100 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select('.cases')
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date)})
    .y(function(d) { return y(d.value)})
    x.domain(d3.extent(data, function(d) { return d.date }));
    y.domain(d3.extent(data, function(d) { return d.value }));

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "")
    .attr("y", 10)
    .attr("dy", "-20px")
    .attr("text-anchor", "end")
    .text("Cases")
    .style("font-size", "15px")

g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}
*/
let covidapi ='https://disease.sh/v3/covid-19/all';

fetch(covidapi)
  .then(response => response.json())
  .then(function(data){
    console.log(data)
    let cases = data.cases
    let deaths = data.deaths
    let recovered = data.recovered
    let newc = data.todayCases
    let newd = data.todayDeaths
    let newr = data.todayRecovered
    $('p.livecase').text("Total Cases")
    $('p.livecase').append("<br /><strong>" + cases + "</strong>")
    $('p.livecase').append("<br /><i>+" + newc + "</i>")
    $('p.livedeaths').text("Total Deaths")
    $('p.livedeaths').append("<br /><strong>" + deaths + "</strong>")
    $('p.livedeaths').append("<br /><i>+" + newd + "</i>")
    $('p.liverecovered').text("Recovered")
    $('p.liverecovered').append("<br /><strong>" + recovered + "</strong>")
    $('p.liverecovered').append("<br /><em>+" + newr + "</em>")
  })
  