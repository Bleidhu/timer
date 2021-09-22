var timerInputField = document.getElementById("timerInput");
var submitButton = document.getElementById("submitButton");
var eventsList = document.getElementById("timestampsList");
var timeStops = [];
var audioToBeChanged = document.querySelector("#audioToBeChanged");

function fixIphone(time) {
  time += "";
  if (String(time).length === 5) {
    return "00:" + time;
  }
  return time;
}

function createListElement() {
  var li = document.createElement("li");
  li.classList.add(fixIphone(timerInputField.value));
  li.appendChild(document.createTextNode(fixIphone(timerInputField.value)));

  //addDisabledAfterClick(li);
  addButton(li);
  eventsList.appendChild(li);
}

// function addListAfterClick() {
//   if (inputLength() > 0) {
//     createListElement();
//   }
// }

// function addListAfterKeypress(event) {
//   if (inputLength() > 0 && event.keyCode === 13) {
//     createListElement();
//   }
// }

// function addDisabledAfterClick(element) {
//   element.addEventListener("click", function () {
//     element.classList.toggle("done");
//   });
// }
function isEqual(element) {
  return element[0] === this.className;
}

function addButton(element) {
  var btnTmp = document.createElement("button");
  btnTmp.appendChild(document.createTextNode("remove"));
  btnTmp.addEventListener("click", (event) => {
    btnTmp.parentElement.remove();
    timeStops.splice(timeStops.findIndex(isEqual, btnTmp.parentElement), 1);
    audioToBeChanged.setAttribute("max", timeStops.length);
    if (timeStops.length === 0) {
      audioToBeChanged.setAttribute("disabled", true);
    }
  });
  element.appendChild(btnTmp);
}

// shoppingListItems.forEach((element) => {
//   addDisabledAfterClick(element);
//   addButton(element);
// });

function processInputedTime() {
  createListElement();

  timeStops.push([fixIphone(timerInputField.value), "./Gong.wav"]);
  timerInputField.value = "00:00:00";
  audioToBeChanged.setAttribute("max", timeStops.length);
  audioToBeChanged.removeAttribute("disabled");
}

var audio = new Audio("./Gong.wav");

submitButton.addEventListener("click", processInputedTime);

var hoursLabel = document.getElementById("hours");
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var stopped = true;
setInterval(setTime, 1000);

function setTime() {
  if (!stopped) {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    hoursLabel.innerHTML = pad(parseInt(totalSeconds / 3600));

    if (
      timeStops.find(
        (element) =>
          element[0] ===
          hoursLabel.innerText +
            ":" +
            minutesLabel.innerText +
            ":" +
            secondsLabel.innerText
      ) !== undefined
    ) {
      audio = new Audio(
        timeStops[
          timeStops.findIndex(
            (element) =>
              element[0] ===
              hoursLabel.innerText +
                ":" +
                minutesLabel.innerText +
                ":" +
                secondsLabel.innerText
          )
        ][1]
      );
      audio.play();
    }
  }
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

var startStopButton = document.getElementById("startStopButton");

function startStop() {
  stopped = !stopped;

  startStopButton.textContent = stopped ? "Start" : "Stop";
}

startStopButton.addEventListener("click", startStop);

var resetButton = document.getElementById("resetButton");

function resetTimer() {
  stopped = false;
  startStop();

  secondsLabel.innerHTML = pad(0);
  minutesLabel.innerHTML = pad(0);
  hoursLabel.innerHTML = pad(0);
  totalSeconds = 0;
}

resetButton.addEventListener("click", resetTimer);

const inputElement = document.getElementById("audioInput");
const setAudio = document.querySelector("#setAudio");
inputElement.addEventListener("change", activateButton, false);
setAudio.addEventListener("click", handleFiles, false);

function activateButton() {
  if (inputElement.files) {
    setAudio.removeAttribute("disabled");
  }
}

function handleFiles() {
  try {
    const fileList = inputElement.files;
    var reader = new FileReader(); /* now you can work with the file list */
    reader.addEventListener(
      "load",
      function () {
        // change the preview's src to be the "result" of reading the uploaded file (below)
        timeStops[audioToBeChanged.value - 1][1] = reader.result;
      },
      false
    );
    //try {
    if (fileList[0]) {
      reader.readAsDataURL(fileList[0]);
    }
  } catch {
    timeStops[audioToBeChanged.value][1] = "./Gong.wav";
  }
}

var audioStop = document.getElementById("audioStop");

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}

audioStop.addEventListener("click", stopAudio);

var testGong = document.getElementById("testGong");

function playSound() {
  audio.play();
}

testGong.addEventListener("click", playSound);
