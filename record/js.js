document.getElementById("record").addEventListener("click", record);

var recording = false;
var interval;
function startInterval() {
    var seconds = 0;
    var minutes = 0;
    document.getElementById("timer").innerHTML = minutes + ": " + seconds;
    interval = setInterval(function() {

        
        seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
       
        document.getElementById("timer").innerHTML = minutes + ": " + seconds;
       
      }, 1000);
}

function stopInterval(){
    clearInterval(interval);
      
}
var mediaAccess =  navigator.mediaDevices.getUserMedia({audio:true});


function handlerFunction(stream) {
    document.getElementById("record").style.backgroundColor = "green";
    recording = true;
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (rec.state == "inactive"){
            let blob = new Blob(audioChunks,{type:'audio/mpeg-3'});
            recordedAudio.src = URL.createObjectURL(blob);
            downloadButton.href = URL.createObjectURL(blob);
            recordedAudio.controls=true;
            recordedAudio.autoplay=true;

        }
    } 
}
    



function record(){
    if(!recording){
        recordedAudio.style.display = 'none';
        downloadButton.style.display = 'none';
        audioChunks = [];
        mediaAccess.then(stream => {handlerFunction(stream)})
        setTimeout(function(){
            rec.start();
            startInterval();
        }, 250); 
    }else{
        //stop rec
        rec.stop();
        stopInterval();
        document.getElementById("record").style.backgroundColor = "red";
        downloadButton.style.display = 'inline';
        recordedAudio.style.display = 'inline';

        recording = false;
        
    }
}
