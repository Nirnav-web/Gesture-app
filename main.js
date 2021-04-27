prediction="";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality:90,
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function  take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img"src="'+data_uri+'">';
    });
} 
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GNbIf4HCa/model.json",modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data="the prediction is "+prediction;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis)
}
function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img,gotResult);
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        document.getElementById("result_gesture_name").innerHTML=result[0].confidence;
        prediction=result[0].label;
        speak();
        if(result[0].label=="victory") {
            document.getElementById("update_gesture").innerHTML="&#9996";
        }
        if(result[0].label=="good") {
            document.getElementById("update_gesture").innerHTML="&#128077";
        }
        if(result[0].label=="awesome") {
            document.getElementById("update_gesture").innerHTML="&#128076";
        }
    }
}