document.addEventListener("DOMContentLoaded", function(){
    var map = $("svg path")
    console.log($("svg .Bosnia"))
    for (let i = 0; i < map.length; i++){
        let c = map[i]
        let n = c.className.baseVal
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
                }          
            })

    }
    
})


