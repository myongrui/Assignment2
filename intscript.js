document.addEventListener("DOMContentLoaded", function(){
    var map = $("svg path")
    $("svg path .Angola").css("fill", "black")
    console.log($("svg path .Angola"))
    console.log(map[0])
    console.log(map[1])
    console.log(map[2])
    var au0 = map[0]
    au0.addEventListener("click", function(){
        console.log("yes");
    })
})

$(document).click(function(event){
    var target = $(event.target);
    var selected = target[0];
    var countryname = selected.className.baseVal;
    let countryapi = "https://disease.sh/v3/covid-19/countries/"+countryname+"?strict=true"
    fetch(countryapi)
        .then(response => response.json())
        .then(function(data){
            console.log(data)
            let cases = data.cases
            let deaths = data.deaths
            let recovered = data.recovered
            let newc = data.todayCases
            let newd = data.todayDeaths
            let newr = data.todayRecovered
            console.log(cases)
        })

})
