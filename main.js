status="";
input="";
objects=[];
synth=window.speechSynthesis;
utterThis=input;



function setup(){
    canvas=createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    input=document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;

}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objeccts Detected is: "+objects.length;
            fill("#FF0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if(objects[i].label==input){
            webcamLiveView.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML=input+" found";
            SpeechSynthesisUtterance("object mentioned found");
            speak().utterThis;
        }
        else{
            document.getElementById("status").innerHTML=input+" not found";
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}