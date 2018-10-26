document.getElementById("id_business_version").innerHTML = "Business version 2018.10.26.0"
document.getElementById("id_start").addEventListener("click", start);
function start(){
    var canvas = document.getElementById("id_canvas");
    var context = canvas.getContext("2d");
    
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 50, 0, 2 * Math.PI);
    context.stroke();
}