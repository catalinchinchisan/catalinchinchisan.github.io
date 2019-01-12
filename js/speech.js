document.getElementById("id_logic_version").innerHTML = "Logic version=2019.01.11.0";
document.getElementById("id_speak").addEventListener("click", on_speak);

var speech = new webkitSpeechRecognition();

speech.lang = "en-US";

speech.onresult = on_result;
speech.onspeechend = on_speech_end;

function on_speak(){
    speech.start();
}

function on_speech_end(){
    speech.stop();
}


function on_result(e){
    document.getElementById("id_text").innerHTML = e.results[0][0].transcript + " " + e.results[0][0].confidence;

}