document.getElementById("id_logic_version").innerHTML = "Logic version=2019.01.11.0";
document.getElementById("id_button").addEventListener("click", on_get_voices);
document.getElementById("id_speak").addEventListener("click", on_speak);

var synth = window.speechSynthesis;


function on_get_voices(){
    document.getElementById("id_voices").innerHTML = "";
    for(var i = 0; i < synth.getVoices().length; i++){
        document.getElementById("id_voices").innerHTML += synth.getVoices()[i].lang + " " + synth.getVoices()[i].name+"<br>";
    }
}



function on_speak(){
    var enunt = new SpeechSynthesisUtterance();
    enunt.lang = "en-US";
    enunt.text = document.getElementById("id_text").value;
    synth.speak(enunt);
}