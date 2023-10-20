video="";
status="";
objects=[];
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(500,370);
    canvas.center();
}

function draw(){
    image(video,0,0,500,400);
    
    if(status !=""){
        objectDetector.detect(video,gotresult);
        for(i=0 ; i<objects.length ; i++){
            document.getElementById("status").innerHTML="Status = objects detected";
            document.getElementById("no_of_objects").innerHTML="number of objects detected = "+objects.length;

            fill("#006994");
            confidence=floor(objects[i].confidence*100);
            text(objects[i].label +" "+confidence+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("seagreen");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);


        }
    }
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    
    console.log(results);
    objects=results;
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting objects";
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}