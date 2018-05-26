var clockArray = new Array();
var currentRunningClock = -1;

function ClockObject(bigTime, mode, animation, color, id) {
  this.bigTime = bigTime;
  this.mode = mode;
  this.animation = animation;
  this.color = color;
  this.id = id;
  var percent;
  var mins;
  var secs;
  var countdownId;
  this.mintues = document.getElementById("mintues_" + id);
  this.seconds = document.getElementById("seconds_" + id);
  this.message = document.getElementById("message_" + id);
  this.start = false;
  this.longBreakVal = 600; // 10 minutes
  this.shortBreakVal = 300; // 5 minutes
  this.isStarted = false;
  this.messageId = "message_" + id;
}

var test = document.getElementById("test");

function initElements(id) {
  clockArray[id] = new ClockObject(1499, "normal", "fadeToBlack", "0D5885", id);
}

function counter(clockId) {
  // Break time into component parts of mins and secs
  clockArray[clockId].mins = Math.floor(clockArray[clockId].bigTime / 60);
  clockArray[clockId].secs =
    clockArray[clockId].bigTime - clockArray[clockId].mins * 60;

  // Change the Html to show the new minutes and seconds
  clockArray[clockId].mintues.innerHtml =
    (clockArray[clockId].mins < 10 ? "0" : "") + clockArray[clockId].mins;

  clockArray[clockId].seconds.innerHtml =
    (clockArray[clockId].secs < 10 ? "0" : "") + clockArray[clockId].secs;
}

// Switch modes if timer ends

