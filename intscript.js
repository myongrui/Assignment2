document.addEventListener("DOMContentLoaded", function(){
    var map = $("svg path")
    console.log($("svg .Bosnia"))
    for (let i = 0; i < map.length; i++){
        let c = map[i]
        let n = c.className.baseVal
        console.log(n)
        let covidapi = "https://corona.lmao.ninja/v2/countries/"+n+"?strict=true"
        fetch(covidapi)
            .then(response => response.json())
            .then(function(data){
                let cpm = data.casesPerOneMillion;
                if (cpm >= 0 && cpm < 100){
                    $("svg ."+n).css({fill: "pink"})
                    console.log("yes");
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


