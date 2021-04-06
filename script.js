// for auto write text
let p = "Stopwatch⏱ created by-Paras Punjabi";

// DOM elements
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let milliseconds = document.querySelector(".milliseconds");
let start = document.querySelector(".start");
let stop = document.querySelector(".stop");
let resume = document.querySelector(".resume");
let lap = document.querySelector(".lap");
let reset = document.querySelector(".reset");
let container = document.querySelector(".container");
let lapTable = document.querySelector(".lapTable");
let lapDiv = document.querySelector(".lapDiv");
let text = document.querySelector(".text");
let btn = document.querySelector(".btn");
let shortcuts = document.querySelector(".shortcuts");

// getting the value of time using parseInt() method
let minutesValue = parseInt(minutes.innerText);
let secondsValue = parseInt(seconds.innerText);
let millisecondsValue = parseInt(milliseconds.innerText);

// global variables for logic purposes
let count = 1; // for lapcount to not to exceed greater than 10
let i = 0; // for auto write text

// auto write text for styling
let textTimer = setInterval(() => {
  if (i >= p.length) {
    i = 0;
    text.innerHTML = "";
  }
  text.innerHTML += p[i].toUpperCase();
  i++;
}, 100);

// more features
window.onkeydown = function (e) {
  if (e.keyCode == 13) {
    startTimer(); // press Enter
  } else if (e.keyCode == 32) {
    StopTimer(); // press SpaceTab
  } else if (e.keyCode == 82) {
    ResumeTimer(); // press R
  } else if (e.keyCode == 76) {
    lapF(); // press L
  } else if (e.keyCode == 81) {
    window.location.reload(); // press Q (Quit)
  }
};

// start the stopwatch
start.addEventListener(
  "click",
  (startTimer = () => {
    text.style.display = "none";
    clearInterval(textTimer);
    start.style.display = "none";
    stop.style.display = "block";
    lap.style.display = "block";
    let timer = setInterval(() => {
      if (millisecondsValue < 100) {
        millisecondsValue++;
      } else if (millisecondsValue > 100 || millisecondsValue == 100) {
        millisecondsValue = 0;
        secondsValue = secondsValue + 1;
      }
      if (secondsValue > 60 || secondsValue == 60) {
        secondsValue = 0;
        minutesValue++;
      }

      if (secondsValue < 10) {
        seconds.innerHTML = `0${secondsValue}`;
      } else {
        seconds.innerHTML = secondsValue;
      }

      if (minutesValue < 10) {
        minutes.innerHTML = `0${minutesValue}`;
      } else {
        minutes.innerHTML = minutesValue;
      }

      if (millisecondsValue < 10) {
        milliseconds.innerHTML = `0${millisecondsValue}`;
      } else {
        milliseconds.innerHTML = millisecondsValue;
      }
    }, 10);

    // stop the time by using clearInterval() method
    stop.addEventListener(
      "click",
      (StopTimer = () => {
        stop.style.display = "none";
        resume.style.display = "block";
        reset.style.display = "block";
        lap.style.display = "none";

        clearInterval(timer);

        if (secondsValue < 10) {
          seconds.innerHTML = `0${secondsValue}`;
        } else {
          seconds.innerHTML = secondsValue;
        }

        if (minutesValue < 10) {
          minutes.innerHTML = `0${minutesValue}`;
        } else {
          minutes.innerHTML = minutesValue;
        }

        if (millisecondsValue < 10) {
          milliseconds.innerHTML = `0${millisecondsValue}`;
        } else {
          milliseconds.innerHTML = millisecondsValue;
        }
      })
    );

    // resuming the stopwatch
    resume.addEventListener(
      "click",
      (ResumeTimer = () => {
        startTimer();
        resume.style.display = "none";
        reset.style.display = "none";
        stop.style.display = "block";
        lap.style.display = "block";
      })
    );
  })
);

// reset the stopwatch by reloading the page
reset.addEventListener("click", () => {
  window.location.reload();
});

// lap btn to show lap timings
lap.addEventListener(
  "click",
  (lapF = () => {
    if (count > 10) {
      lap.removeEventListener("click", lapF);
      return;
    }

    lapDiv.style.opacity = 1;
    let table = document.createElement("tr");
    table.innerHTML = ` <td>${count}</td>
                       <td>${container.innerText}</td>
                       `;
    count++;
    lapTable.appendChild(table);
  })
);

// to toggle shortcuts div form opacity to 0 or 1
btn.addEventListener("click", () => {
 shortcuts.classList.toggle('opacity')
});
