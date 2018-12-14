document.getElementById("id_logic_version").innerHTML = "Logic version = 2018.12.14.0";
document.getElementById("id_canvas").addEventListener("touchstart", on_touch_start);
function on_touch_start(e){
    var t = e.changedTouches;
    var canvas = document.getElementById("id_canvas");
    var rect = canvas.getBoundingClientRect();
    var context = canvas.getContext("2d");
    for (var i = 0; i < t.length; i++){
        
        context.beginPath();
        context.arc(t[i].pageX - rect.left, t[i].pageY - rect.top, 20, 0, 2 * Math.PI);
        context.stroke();
    }
}