let startCount;

const startTimer = seconds => {
  //clears timer on start.
  clearInterval(startCount);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeleft(seconds);
  displayEndTime(then);

  document.querySelector(".btn").style.display = "inline";

  startCount = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    //Stop countdown if less than 0.
    if (secondsLeft < 0) {
      //Play beep when timer is zero.
      var audio = new Audio("./Bleep-SoundBible.com-1927126940.mp3");
      audio.play();
      clearInterval(startCount);
      document.querySelector(".return-time").textContent = " ";
      return;
    }
    displayTimeleft(secondsLeft);
  }, 1000);
};

const displayTimeleft = seconds => {
  //Converts seconds to minute and seconds.
  const minuteCount = Math.floor(seconds / 60);
  const secondsCount = seconds % 60;
  const secondsCount2 =
    secondsCount < 10 ? `0${secondsCount}` : `${secondsCount}`;
  document.querySelector(
    ".main-timer"
  ).textContent = `${minuteCount}:${secondsCount2}`;
  document.title = `Timerrr: ${minuteCount}:${secondsCount2}`;
};

//Displays end time.
const displayEndTime = endTime => {
  const currentTime = new Date(endTime);
  const returnHour = currentTime.getHours();
  const returnMinute = currentTime.getMinutes();
  const returnTime = `${returnHour}:${
    returnMinute < 10 ? "0" : " "
  }${returnMinute}`;
  document.querySelector(".return-time").textContent = returnTime;
};

//Event Listener for key "enter".
document.userValue.addEventListener("submit", function(e) {
  e.preventDefault();
  const userEnteredValue = this.userMinute.value;
  if (isNaN(userEnteredValue)) {
    alert("Please enter a number, Chief.");
    this.userMinute.value = "";
  } else {
    this.userMinute.value = "";
    startTimer(userEnteredValue * 60);
  }
});

const cancelTimer = () => {
  clearInterval(startCount);
  document.querySelector(".return-time").textContent = "";
  document.querySelector(".main-timer").textContent = "0:00";
  document.title = "Countdown Timer";
};

//Event listener for cancel button.
document.querySelector(".btn").addEventListener("click", cancelTimer);

//Theme switcher.
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

//Toggle Event Listener.main-timer-div
toggleSwitch.addEventListener("change", switchTheme, false);

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}
