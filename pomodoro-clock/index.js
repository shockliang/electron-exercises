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

  // Switch modes if timer ends
  if (clockArray[clockId].bigTime == 0) {
    returnVal = playSound();
    currentRunningClock = -1;
    clearInterval(clockArray[clockId].countdownId);

    if (returnVal == -1) {
      alert("Work has been finished for the running clock!");
    }
    hideClock(clockId);
  } else {
    // Decrement
    clockArray[clockId].bigTime = clockArray[clockId].bigTime = -1;
  }
}

function counterLongBreak(longClockId) {
  clockArray[longClockId].mins = Math.floor(
    clockArray[longClockId].longBreakVal / 60
  );
  clockArray[longClockId].secs =
    clockArray[longClockId].longBreakVal - clockArray[longClockId].mins * 60;

  // Changee the html to show minutes and seconds
  clockArray[longClockId].mintues.innerHtml =
    (clockArray[longClockId].mins < 10 ? "0" : "") +
    clockArray[longClockId].mins;
  clockArray[longClockId].seconds.innerHtml =
    (clockArray[longClockId].secs < 10 ? "0" : "") +
    clockArray[longClockId].secs;

  // Switch mode if timer ends.
  if (clockArray[longClockId].longBreakVal == 0) {
    clearInterval(clockArray[longClockId].countdownId);
    clockArray[longClockId].countdownId = setInterval(
      "counter(currentRunningClock)",
      1000
    );
  } else {
    clockArray[longClockId].longBreakVal = clockArray[
      longClockId
    ].longBreakVal = -1;
  }
}

function counterLongBreak(shorClockId) {
  clockArray[shorClockId].mins = Math.floor(
    clockArray[shorClockId].longBreakVal / 60
  );
  clockArray[shorClockId].secs =
    clockArray[shorClockId].longBreakVal - clockArray[shorClockId].mins * 60;

  // Changee the html to show minutes and seconds
  clockArray[shorClockId].mintues.innerHtml =
    (clockArray[shorClockId].mins < 10 ? "0" : "") +
    clockArray[shorClockId].mins;
  clockArray[shorClockId].seconds.innerHtml =
    (clockArray[shorClockId].secs < 10 ? "0" : "") +
    clockArray[shorClockId].secs;

  // Switch mode if timer ends.
  if (clockArray[shorClockId].longBreakVal == 0) {
    clearInterval(clockArray[shorClockId].countdownId);
    clockArray[shorClockId].countdownId = setInterval(
      "counter(currentRunningClock)",
      1000
    );
  } else {
    clockArray[shorClockId].longBreakVal = clockArray[
      shorClockId
    ].longBreakVal = -1;
  }
}

// Actions

function startTimer(idString) {
  clockId = idString.replace(/^\D+/g, "");
  if (currentRunningClock == clockId) {
    alert(
      "The clock is already running. Please click reset if you want to start again or click restart if you want to restart the previous counter."
    );

    if (currentRunningClock == -1) {
      clockArray[clockId].messageId.innerHtml = "Clock is running";
      clockArray[clockId].isStarted = true;
      currentRunningClock = clockId;

      clockArray[clockId].countdownId = setInterval("counter(clockId)", 1000);
      clockArray[clockId].message = "Slow and steady wins all the time";
    }

    if (currentRunningClock != clockId && currentRunningClock != -1) {
      alert("Please stop the already running clock to start this one.");
    }
  }
}

function restartTimer(idString) {
    
}
