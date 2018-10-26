document.getElementById("id_business_version").innerHTML = "Business version 2018.10.26.6"
document.getElementById("id_start").addEventListener("click", start);
document.getElementById("id_stop").addEventListener("click", stop);

document.getElementById("id_start").disabled = false;
document.getElementById("id_stop").disabled = true;

document.getElementById("id_stop").addEventListener("click", stop);

var alpha = {unghi:0};
function deseneazaCerc(context, w, h,alpha){
    
    alpha.unghi++;
    context.clearRect(0, 0, w, h);

    var r = 100;
    
    var x = w / 2 + r * Math.cos(alpha.unghi * Math.PI  / 180);
    var y = h / 2 + r * Math.sin(alpha.unghi * Math.PI  / 180);
        
    context.beginPath();
    context.arc(x, y, 50, 0, 2 * Math.PI);
    context.stroke();
    
}

function start(){
    document.getElementById("id_start").disabled = true;
    document.getElementById("id_stop").disabled = false;
    var canvas = document.getElementById("id_canvas");
    var context = canvas.getContext("2d");
    
    intervalId = setInterval(  deseneazaCerc, 10, context, canvas.width, canvas.height, alpha, 100);

    var my_worker = new Worker("js/calcul_prime.js");
    my_worker.onmessage = function(e){
        document.getElementById("id_prime").innerHTML = e.data;
    }
    
}

function stop(){
    clearInterval(intervalId);
    document.getElementById("id_start").disabled = false;
    document.getElementById("id_stop").disabled = true;
}
