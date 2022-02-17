

document.addEventListener("DOMContentLoaded", function(){
    var map = $("svg path")
    for (let i = 0; i < map.length; i++){
        let c = map[i]
        let n = c.className.baseVal
        let covidapi = "https://corona.lmao.ninja/v2/countries/"+n+"?strict=true"
        fetch(covidapi)
            .then(response => response.json())
            .then(function(data){
                let cpm = data.casesPerOneMillion;
                let cn = (n.split(" "))[0] 
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

    function drawLine(ctx, startX, startY, endX, endY,color){
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
        ctx.restore();
    }
    
    function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
        ctx.save();
        ctx.fillStyle=color;
        ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
        ctx.restore();
    }

    var Barchart = function(options){
        this.options = options;
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.colors = options.colors;
      
        this.draw = function(){
            var maxValue = 0;
            for (var categ in this.options.data){
                maxValue = Math.max(maxValue,this.options.data[categ]);
            }
            var canvasActualHeight = this.canvas.height - this.options.padding * 2;
            var canvasActualWidth = this.canvas.width - this.options.padding * 2;
     
            //drawing the grid lines
            var gridValue = 0;
            while (gridValue <= maxValue){
                var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
                drawLine(
                    this.ctx,
                    0,
                    gridY - 5,
                    this.canvas.width,
                    gridY - 5,
                    "#afadad"
                );
                 
                //writing grid markers
                this.ctx.save();
                this.ctx.fillStyle = "#000000";
                this.ctx.font = "bold 10px Arial";
                this.ctx.fillText(gridValue, 0,gridY - 5);
                this.ctx.restore();
     
                gridValue+=this.options.gridScale;
            }
      
            //drawing the bars
            var barIndex = 0;
            var numberOfBars = Object.keys(this.options.data).length;
            var barSize = (canvasActualWidth)/numberOfBars;
     
            for (categ in this.options.data){
                var val = this.options.data[categ];
                var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
                drawBar(
                    this.ctx,
                    this.options.padding + barIndex * barSize + 10,
                    this.canvas.height - barHeight - this.options.padding,
                    barSize,
                    barHeight - 5,
                    this.colors[barIndex%this.colors.length]
                );
     
                barIndex++;
            }

            //series name
            this.ctx.save();
            this.ctx.textBaseline="bottom" - 10;
            this.ctx.textAlign="center";
            this.ctx.fillStyle = "#000000";
            this.ctx.font = "bold 14px Arial";
            this.ctx.fillText("Cases(millions)", this.canvas.width/2,this.canvas.height);
            this.ctx.restore();
            
            //draw legend
            barIndex = 0;
            var legend = document.querySelector("legend[for='myCanvas']");
            var ul = document.createElement("ul");
            legend.append(ul);
            for (categ in this.options.data){
                var li = document.createElement("li");
                li.style.listStyle = "none";
                li.style.borderLeft = "15px solid "+this.colors[barIndex%this.colors.length];
                li.style.padding = "2px";
                li.textContent = categ;
                li.style.fontSize = "15px"
                ul.append(li);
                barIndex++;
            }
      
        }
    }

    let continentapi = 'https://corona.lmao.ninja/v2/continents?sort=continent';
    fetch(continentapi)
    .then(response => response.json())
    .then(function(data){ 
        var d1 = data[0].cases
        var d2 = data[1].cases
        var d3 = data[2].cases
        var d4 = data[3].cases
        var d5 = data[4].cases
        var d6 = data[5].cases

        var continents = {
            "South America": d1/1000000,
            "North America": d2/1000000,
            "Europe": d3/1000000,
            "Australia-Oceania": d4/1000000,
            "Asia": d5/1000000,
            "Africa": d6/1000000
        };


        console.log(continents)

        var myCanvas = document.getElementById("myCanvas");
        myCanvas.width = 500;
        myCanvas.height = 500;
  
        var ctx = myCanvas.getContext("2d");
        
        var myBarchart = new Barchart(
            {
                canvas:myCanvas,
                padding:10,
                gridScale:5,
                gridColor:"#afadad",
                data: continents,
                colors:["#c8d65b","#ffbb30", "#5200ae","#00ae8f", "#c12592", "#0a71d5"]
            }
        );

        myBarchart.draw();

        //Africa Data
        let afcases = data[5].cases
        let afdeaths = data[5].deaths
        let afrecovered = data[5].recovered
        let afnewc = data[5].todayCases
        let afnewd = data[5].todayDeaths
        let afnewr = data[5].todayRecovered 
        //Loading Africa Data
        $('.Africa').text("Africa")
        $('p.livecaseaf').text("Total Cases")
        $('p.livecaseaf').append("<br /><strong>" + afcases + "</strong>")
        $('p.livecaseaf').append("<br /><i>+" + afnewc + "</i>")
        $('p.livedeathsaf').text("Total Deaths")
        $('p.livedeathsaf').append("<br /><strong>" + afdeaths + "</strong>")
        $('p.livedeathsaf').append("<br /><i>+" + afnewd + "</i>")
        $('p.liverecoveredaf').text("Recovered")
        $('p.liverecoveredaf').append("<br /><strong>" + afrecovered + "</strong>")
        $('p.liverecoveredaf').append("<br /><em>+" + afnewr + "</em>")

        //Asia
        let ascases = data[4].cases
        let asdeaths = data[4].deaths
        let asrecovered = data[4].recovered
        let asnewc = data[4].todayCases
        let asnewd = data[4].todayDeaths
        let asnewr = data[4].todayRecovered
        //Loading Asia Data
        $('.Asia').text("Asia")
        $('p.livecaseas').text("Total Cases")
        $('p.livecaseas').append("<br /><strong>" + ascases + "</strong>")
        $('p.livecaseas').append("<br /><i>+" + asnewc + "</i>")
        $('p.livedeathsas').text("Total Deaths")
        $('p.livedeathsas').append("<br /><strong>" + asdeaths + "</strong>")
        $('p.livedeathsas').append("<br /><i>+" + asnewd + "</i>")
        $('p.liverecoveredas').text("Recovered")
        $('p.liverecoveredas').append("<br /><strong>" + asrecovered + "</strong>")
        $('p.liverecoveredas').append("<br /><em>+" + asnewr + "</em>")

        //Australia-Oceania
        let aucases = data[3].cases
        let audeaths = data[3].deaths
        let aurecovered = data[3].recovered
        let aunewc = data[3].todayCases
        let aunewd = data[3].todayDeaths
        let aunewr = data[3].todayRecovered
        //Loading Australia-Oceania Data
        $('.AusOce').text("Australia-Oceania")
        $('p.livecaseao').text("Total Cases")
        $('p.livecaseao').append("<br /><strong>" + aucases + "</strong>")
        $('p.livecaseao').append("<br /><i>+" + aunewc + "</i>")
        $('p.livedeathsao').text("Total Deaths")
        $('p.livedeathsao').append("<br /><strong>" + audeaths + "</strong>")
        $('p.livedeathsao').append("<br /><i>+" + aunewd + "</i>")
        $('p.liverecoveredao').text("Recovered")
        $('p.liverecoveredao').append("<br /><strong>" + aurecovered + "</strong>")
        $('p.liverecoveredao').append("<br /><em>+" + aunewr + "</em>")

        //Europe
        let eucases = data[2].cases
        let eudeaths = data[2].deaths
        let eurecovered = data[2].recovered
        let eunewc = data[2].todayCases
        let eunewd = data[2].todayDeaths
        let eunewr = data[2].todayRecovered
        //Loading Europe Data
        $('.Europe').text("Europe")
        $('p.livecaseeu').text("Total Cases")
        $('p.livecaseeu').append("<br /><strong>" + eucases + "</strong>")
        $('p.livecaseeu').append("<br /><i>+" + eunewc + "</i>")
        $('p.livedeathseu').text("Total Deaths")
        $('p.livedeathseu').append("<br /><strong>" + eudeaths + "</strong>")
        $('p.livedeathseu').append("<br /><i>+" + eunewd + "</i>")
        $('p.liverecoveredeu').text("Recovered")
        $('p.liverecoveredeu').append("<br /><strong>" + eurecovered + "</strong>")
        $('p.liverecoveredeu').append("<br /><em>+" + eunewr + "</em>")

        //North America
        let nacases = data[1].cases
        let nadeaths = data[1].deaths
        let narecovered = data[1].recovered
        let nanewc = data[1].todayCases
        let nanewd = data[1].todayDeaths
        let nanewr = data[1].todayRecovered
        //Loading North America Data
        $('.NA').text("North America")
        $('p.livecasena').text("Total Cases")
        $('p.livecasena').append("<br /><strong>" + nacases + "</strong>")
        $('p.livecasena').append("<br /><i>+" + nanewc + "</i>")
        $('p.livedeathsna').text("Total Deaths")
        $('p.livedeathsna').append("<br /><strong>" + nadeaths + "</strong>")
        $('p.livedeathsna').append("<br /><i>+" + nanewd + "</i>")
        $('p.liverecoveredna').text("Recovered")
        $('p.liverecoveredna').append("<br /><strong>" + narecovered + "</strong>")
        $('p.liverecoveredna').append("<br /><em>+" + nanewr + "</em>")

        //South America
        let sacases = data[0].cases
        let sadeaths = data[0].deaths
        let sarecovered = data[0].recovered
        let sanewc = data[0].todayCases
        let sanewd = data[0].todayDeaths
        let sanewr = data[0].todayRecovered
        //Loading South America Data
        $('.SA').text("South America")
        $('p.livecasesa').text("Total Cases")
        $('p.livecasesa').append("<br /><strong>" + sacases + "</strong>")
        $('p.livecasesa').append("<br /><i>+" + sanewc + "</i>")
        $('p.livedeathssa').text("Total Deaths")
        $('p.livedeathssa').append("<br /><strong>" + sadeaths + "</strong>")
        $('p.livedeathssa').append("<br /><i>+" + sanewd + "</i>")
        $('p.liverecoveredsa').text("Recovered")
        $('p.liverecoveredsa').append("<br /><strong>" + sarecovered + "</strong>")
        $('p.liverecoveredsa').append("<br /><em>+" + sanewr + "</em>")
        
    })
    
    console.log(myVinyls)
    var myBarchart = new Barchart(
        {
            canvas:myCanvas,
            padding:10,
            gridScale:5,
            gridColor:"#eeeeee",
            data: myVinyls,
            colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
        }
    );
    myBarchart.draw();
    
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
                if (cases == undefined){
                    cases = "no data"
                    deaths = "no data"
                    recovered = "no data"
                    $('.cname').text(countryname)
                    $('p.livecase').text("Total Cases")
                    $('p.livecase').append("<br /><strong>" + cases + "</strong>")
                    $('p.livedeaths').text("Total Deaths")
                    $('p.livedeaths').append("<br /><strong>" + deaths + "</strong>")
                    $('p.liverecovered').text("Recovered")
                    $('p.liverecovered').append("<br /><strong>" + recovered + "</strong>")
                }           
                else if (countryname != "mapc" ){
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










