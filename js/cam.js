document.getElementById("id_logic_version").innerHTML = "Logic version=2019.01.11.0";
document.getElementById("id_button").addEventListener("click", on_get_cam);

function on_cam_error(e){
    alert("cam error");
}
function on_cam_ok(e){
    document.getElementById("id_video").srcObject = e;
}
function on_get_cam(){
    var c = {audio: true, video:true};
   // navigator.mediaDevices.getUserMedia(c, on_cam_ok, on_cam_error);

    navigator.mediaDevices.getUserMedia(c)
    .then(function(stream) {
    /* use the stream */
    document.getElementById("id_video").srcObject = stream;
    })
    .catch(function(err) {
    /* handle the error */
    });
}