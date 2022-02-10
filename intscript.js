

document.addEventListener("DOMContentLoaded", function(){
    var au = $("svg path")
    console.log(au[0])
    console.log(au[1])
    var au0 = au[0]
    au0.addEventListener("click", function(){
        console.log("yes");
    })
})