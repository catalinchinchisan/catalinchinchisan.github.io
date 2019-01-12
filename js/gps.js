document.getElementById("id_logic_version").innerHTML = "Logic version=2019.01.11.0";
document.getElementById("id_button").addEventListener("click", on_gps_position);

function on_gps_ok(e){
    document.getElementById("id_lat").innerHTML = e.coords.latitude;
    document.getElementById("id_long").innerHTML = e.coords.longitude;
    document.getElementById("id_acc").innerHTML = e.coords.accuracy;
}

function on_gps_error(e){
    alert("error")
}

function on_gps_position(){
    navigator.geolocation.getCurrentPosition(on_gps_ok, on_gps_error);
}