let allcountries = new Set();

document.addEventListener("DOMContentLoaded", function(){
    var map = $("svg path")
    console.log($("svg .Bosnia"))
    for (let i = 0; i < map.length; i++){
        let c = map[i]
        let n = c.className.baseVal
        allcountries.add(n)
        let covidapi = "https://corona.lmao.ninja/v2/countries/"+n+"?strict=true"
        fetch(covidapi)
            .then(response => response.json())
            .then(function(data){
                let cpm = data.casesPerOneMillion;
                console.log(n)
                console.log(cpm)
                let cn = (n.split(" "))[0] 
                console.log(cn)
                if (cpm >= 0 && cpm < 100){
                    $("svg ."+cn).css({fill: "#fff7fb"})
                }   else if (cpm >= 100 && cpm < 500){
                    $("svg ."+cn).css({fill: "#ece7f2"})
                }   else if (cpm >= 500 && cpm < 1000){
                    $("svg ."+cn).css({fill: "#d0d1e6"})    
                }   else if (cpm >= 1000 && cpm < 5000){
                    $("svg ."+cn).css({fill: "#a6bddb"})
                }   else if (cpm >= 5000 && cpm < 10000){
                    $("svg ."+cn).css({fill: "#74a9cf"})
                }   else if (cpm >= 10000 && cpm < 50000){
                    $("svg ."+cn).css({fill: "#3690c0"})
                }   else if (cpm >= 50000 && cpm < 100000){
                    $("svg ."+cn).css({fill: "#0570b0"})
                }   else if (cpm >= 100000 && cpm < 500000){
                    $("svg ."+cn).css({fill: "#045a8d"})
                }   else if (cpm >= 500000 && cpm < 1000000){
                    $("svg ."+cn).css({fill: "#023858"})
                }
                
    })


    }
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
        $('.cname').text("World")
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
})

$(document).click(function(event){
    var target = $(event.target);
    var selected = target[0];
    var countryname = selected.className.baseVal;
    if (countryname != undefined){
        let countryapi = "https://corona.lmao.ninja/v2/countries/"+countryname+"?strict=true"
        fetch(countryapi)
            .then(response => response.json())
            .then(function(data){
                console.log(data)
                let cases = data.cases
                let deaths = data.deaths
                let recovered = data.recovered
                let newc = data.todayCases
                console.log(newc)
                let newd = data.todayDeaths
                let newr = data.todayRecovered
                if (countryname != "mapc"){
                    $('.cname').text(countryname)
                    $('p.livecase').text("Total Cases")
                    $('p.livecase').append("<br /><strong>" + cases + "</strong>")
                    $('p.livecase').append("<br /><i>+" + newc + "</i>")
                    $('p.livedeaths').text("Total Deaths")
                    $('p.livedeaths').append("<br /><strong>" + deaths + "</strong>")
                    $('p.livedeaths').append("<br /><i>+" + newd + "</i>")
                    $('p.liverecovered').text("Recovered")
                    $('p.liverecovered').append("<br /><strong>" + recovered + "</strong>")
                    $('p.liverecovered').append("<br /><em>+" + newr + "</em>")
                    const api = 'https://corona.lmao.ninja/v2/historical/'+countryname+'?lastdays=365';

                    fetch(api)
                        .then(function(response) { return response.json(); })
                        .then(function(data) {
                            var parsedData = parseData(data);
                            drawChart(parsedData);
                            
                        })
                        .catch(function(err) { console.log(err); })

                    function parseData(data) {
                        var arr = [];
                        console.log(data.timeline.cases)
                        for (var i in data.timeline.cases) {
                            arr.push({
                                date: new Date(i), 
                                value: +data.timeline.cases [i] 
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

                }   
                 
            })
        
    }
})



$("button").click(function(event){
    console.log("yes");  
    console.log(allcountries);  
})







