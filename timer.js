var timerInputField = document.getElementById("timerInput");
var submitButton = document.getElementById("submitButton");
var eventsList = document.getElementById("timestampsList");
var timeStops = [];

function createListElement() {
  var li = document.createElement("li");
  li.classList.add(timerInputField.value);
  li.appendChild(document.createTextNode(timerInputField.value));

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
  return element === this.className;
}

function addButton(element) {
  var btnTmp = document.createElement("button");
  btnTmp.appendChild(document.createTextNode("remove"));
  btnTmp.addEventListener("click", (event) => {
    btnTmp.parentElement.remove();
    timeStops.splice(timeStops.findIndex(isEqual, btnTmp.parentElement), 1);
  });
  element.appendChild(btnTmp);
}

// shoppingListItems.forEach((element) => {
//   addDisabledAfterClick(element);
//   addButton(element);
// });

function processInputedTime() {
  alert(timerInputField.value);

  createListElement();

  timeStops.push(timerInputField.value);
  timerInputField.value = "00:00:00";
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
      timeStops.includes(
        hoursLabel.innerText +
          ":" +
          minutesLabel.innerText +
          ":" +
          secondsLabel.innerText
      )
    ) {
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
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
  try {
    audio = new Audio(fileList[0]);
  } catch {}
}
