window.onload = function () {
    var seconds = 59;
    var appendSeconds = document.getElementById("seconds");
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonPlay = document.getElementById('button-play');
    var buttonNo = document.getElementById('button-no');
    var Interval ;

    buttonStart.onclick = function() {
        clearInterval(Interval);
        document.getElementById('start-screen').style.display = "none";
        document.getElementById('main-screen').style.display = "block";
        Interval = setInterval(startTimer, 1000);
    };

    buttonStop.onclick = function() {
        clearInterval(Interval);
        buttonPlay.style.display = "block";
        buttonStop.style.display = "none";
        document.getElementById('wait-screen').style.display = "block";
    };

    buttonPlay.onclick = function() {
        clearInterval(Interval);
        buttonPlay.style.display = "none";
        buttonStop.style.display = "block";
        document.getElementById('wait-screen').style.display = "none";
        Interval = setInterval(startTimer, 1000);
    };

    buttonNo.onclick = function() {
        clearInterval(Interval);
        buttonPlay.style.display = "none";
        buttonStop.style.display = "block";
        document.getElementById('wait-screen').style.display = "none";
        Interval = setInterval(startTimer, 1000);
    };

    function startTimer () {
        seconds--;
        if (seconds <= 9){
            appendSeconds.innerHTML = "0" + seconds;
        }
        else{
            appendSeconds.innerHTML = "" + seconds;
        }
        if (seconds == 0){
            seconds = 0;
            appendSeconds.innerHTML = "0" + seconds;
            clearInterval(Interval);
            document.getElementById('main-screen').style.display = "none";
            document.getElementById('end-screen').style.display = "block";

            var score = 0;
            if (score <= count){
                document.getElementById('best-score').style.display = "block";
            }
        }
    }
};

function video_on() {
    document.getElementById('info').style.display = 'none';
    document.getElementById('ON').style.display = 'none';
    document.getElementById('video').style.display = 'block';
    document.getElementById('OFF').style.display = 'inline-block';
    document.getElementById('video').play();
}

function video_off() {
    document.getElementById('video').style.display = 'none';
    document.getElementById('OFF').style.display = 'none';
    document.getElementById('ON').style.display = 'inline-block';
    document.getElementById('info').style.display = 'block';
    document.getElementById('video').load();
}

function flip_endCard() {
    document.getElementById('main-screen').style.display = "none";
    document.getElementById('wait-screen').style.display = "none";
    document.getElementById('end-screen').style.display = "block";
}

function startRTW() {
    document.getElementById('start-screen').style.display = "none";
    document.getElementById('main-screen').style.display = "block";
}

function pauseRTW() {
    document.getElementById('button-play').style.display = "block";
    document.getElementById('button-stop').style.display = "none";
    document.getElementById('wait-screen').style.display = "block";
}

function playRTW() {
    document.getElementById('button-play').style.display = "none";
    document.getElementById('button-stop').style.display = "block";
    document.getElementById('wait-screen').style.display = "none";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}