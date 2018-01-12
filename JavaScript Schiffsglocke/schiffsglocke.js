window.onload = function () {
    setInterval(function () {
        var time = new Date();
        document.getElementById("time").innerHTML = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        ringIfNeeded(time);
        document.getElementById("wache").innerHTML = wachen[Math.floor(time.getHours() / 4)];
    }, 1000);
}
var wachen = ["Hundswache", "Morgenwache", "Vormittagswache", "Nachmittagswache", "Plattfußwache", "Abendwache"];
function ringIfNeeded(time) {
    var rings = time.getHours() % 4;
    rings = rings * 2;
    if (time.getMinutes() == 0 && time.getSeconds() == 0) {
        ring(rings);
    }
    if (time.getMinutes() == 30 && time.getSeconds() == 0) {
        rings++;
        ring(rings);
    }
    
    
    
 

}
function ring(i) {
    if (i >= 2) {
        playSound();
        i--;
        setTimeout(playSound, 1000);
        i--;
        console.log("dingding");
        
    }
    else {
        playSound(2);
        i--;
        console.log("ding");
    }
    if (i == 0) {
        return;
    }
    setTimeout(ring, 3000,i);
    
}
function playSound() {

    var audio = new Audio("belllong.mp3");
    
    audio.play();
   
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
