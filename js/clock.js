var color, bgcolor;
var mode;
var stop = 0;
var I = 0;
var HR;
var MN;
var idTimer;
var idTime;
var idAlarm;
var idStopwatch;

function Reset() {
    location.reload();
}
function Stop() {
    stop = 1;
}
function clearLed(led, bgcolor){
    var segments = document.getElementById(led).getElementsByTagName("svg");
    for(var i=0; i<7; i++){
        segments[i].style.fill = bgcolor;        
    }
}

function setLed(led, digit, color, bgcolor){
    var segments = document.getElementById(led).getElementsByTagName("svg");
    var segValues =[[1,1,1,1,1,1,0],
                    [0,1,1,0,0,0,0],
                    [1,1,0,1,1,0,1],
                    [1,1,1,1,0,0,1],
                    [0,1,1,0,0,1,1],
                    [1,0,1,1,0,1,1],
                    [1,0,1,1,1,1,1],
                    [1,1,1,0,0,0,0],
                    [1,1,1,1,1,1,1],
                    [1,1,1,1,0,1,1]
                    ];
    //Clear led (turn all segments off)
    clearLed(led, bgcolor);    

    //Turn on segments for value digit
    for(var i=0; i<7; i++){
        if(segValues[digit][i]){
            segments[i].style.fill = color;
        }
    }            
}
function showContinuousTime(color, bgcolor){
    clearInterval(idStopwatch);
    clearInterval(idAlarm);
    clearInterval(idTimer);
    clearInterval(idTime);
    idTime = setInterval(showTime, 1000);
    function showTime(){
        if (mode != 2) {
            clearLed(led, bgcolor);
            return;
        }
        var d = new Date();
        var timezone = document.getElementById("timezone").value;
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var dd = new Date(utc + (3600000*timezone));
        var hrs = dd.getHours();
        var mins = dd.getMinutes();
        var secs = dd.getSeconds();
        setLed('led0', (hrs >= 10) ? Math.floor(hrs/10) : 0, color, bgcolor );
        setLed('led1', hrs % 10, color, bgcolor );
        setLed('led2', (mins >= 10) ? Math.floor(mins/10) : 0, color, bgcolor );
        setLed('led3', mins % 10, color, bgcolor );
        setLed('led4', (secs >= 10) ? Math.floor(secs/10) : 0, color, bgcolor );
        setLed('led5', secs % 10, color, bgcolor );    
    }
}
function setMode(modeNum) {
    mode = modeNum;
    if (mode == 4) {
        stop = 0;
    }
}

function Timer(color, bgcolor) {
    clearInterval(idStopwatch);
    clearInterval(idAlarm);
    clearInterval(idTime);
    clearInterval(idTimer);
    var input = document.getElementById("userInput").value;
    idTimer = setInterval(showTime1, 1000);
    function showTime1() {
        if (mode != 1) {
            input = -1;
            clearLed(led, bgcolor);
            return;
        }
        var hrs = Math.floor(input / 3600);
        var remaining = input % 3600;
        var mins = Math.floor(remaining / 60);
        var secs = remaining % 60;
        setLed('led0', (hrs >= 10) ? Math.floor(hrs/10) : 0, color, bgcolor );
        setLed('led1', hrs % 10, color, bgcolor );
        setLed('led2', (mins >= 10) ? Math.floor(mins/10) : 0, color, bgcolor );
        setLed('led3', mins % 10, color, bgcolor );
        setLed('led4', (secs >= 10) ? Math.floor(secs/10) : 0, color, bgcolor );
        setLed('led5', secs % 10, color, bgcolor ); 
        input = input - 1;
        if (input == -1) {
            alert("TIMER DONE");
            mode = 2;
            showContinuousTime(color, bgcolor);
            clearInterval(idTimer);
            return;
        }
    }
    if (input == -1) {
        return;
    }
}
function Stopwatch(color, bgcolor) {
    clearInterval(idStopwatch);
    clearInterval(idAlarm);
    clearInterval(idTime);
    clearInterval(idTimer);
    idStopwatch = setInterval(showTime2, 1000);
    if (mode != 4) {
        clearLed(led, bgcolor);
        return;
    }
    function showTime2(){
        if (stop == 0) {
            if (mode != 4) {
                clearLed(led, bgcolor);
                return;
            }
            var hrs = Math.floor(I / 3600);
            var remaining = I % 3600;
            var mins = Math.floor(remaining / 60);
            var secs = remaining % 60;
            setLed('led0', (hrs >= 10) ? Math.floor(hrs/10) : 0, color, bgcolor );
            setLed('led1', hrs % 10, color, bgcolor );
            setLed('led2', (mins >= 10) ? Math.floor(mins/10) : 0, color, bgcolor );
            setLed('led3', mins % 10, color, bgcolor );
            setLed('led4', (secs >= 10) ? Math.floor(secs/10) : 0, color, bgcolor );
            setLed('led5', secs % 10, color, bgcolor ); 
            I = I + 1;
        }
    }
}
function removeAlarm() {
    clearInterval(idAlarm);
    HR = 0; 
    MN = 0;
    alert("Alarm Removed");
}
function Alarm(color, bgcolor) {
    clearInterval(idStopwatch);
    clearInterval(idAlarm);
    clearInterval(idTime);
    clearInterval(idTimer);
    HR = document.getElementById("userInput1").value;
    MN = document.getElementById("userInput2").value;
    alert("Alarm Set");
    idAlarm = setInterval(showTime3, 1000);
    function showTime3(){
        if (mode != 3) {
           clearLed(led, bgcolor);
            return; 
        }
        var d = new Date();
        var hrs = d.getHours();
        var mins = d.getMinutes();
        var secs = d.getSeconds();
        setLed('led0', (hrs >= 10) ? Math.floor(hrs/10) : 0, color, bgcolor );
        setLed('led1', hrs % 10, color, bgcolor );
        setLed('led2', (mins >= 10) ? Math.floor(mins/10) : 0, color, bgcolor );
        setLed('led3', mins % 10, color, bgcolor );
        setLed('led4', (secs >= 10) ? Math.floor(secs/10) : 0, color, bgcolor );
        setLed('led5', secs % 10, color, bgcolor );   
        if (HR == hrs && MN == mins) {
            alert("ALARM ALARM!!!!");
            clearInterval(idAlarm);
            return
        }
    }
    if (mode != 3) {
        clearLed(led, bgcolor);
        return; 
    }
}