//WELCOME-SLIDER

const wlcSliderWrp = document.querySelector(".welcome-slides");
const wlcSlides = document.querySelectorAll(".welcome-slider__image");
const firstSlide = wlcSlides[0];
const lastSlide = wlcSlides[wlcSlides.length - 1];
const cloneFirstSlide = firstSlide.cloneNode(true);
const cloneLastSlide = lastSlide.cloneNode(true);

wlcSliderWrp.appendChild(cloneFirstSlide);
wlcSliderWrp.insertBefore(cloneLastSlide, firstSlide);

const imageWidth = wlcSlides[0].clientWidth;
let shift = -imageWidth;
wlcSliderWrp.style = `transform: translateX(${shift}px);`;

const welcomeControls = document.querySelector(".welcome-slider-controls");

const wlcReset = () => {
  wlcSliderWrp.style = `transform: translateX(${shift}px);`;
  wlcSliderWrp.removeEventListener("transitionend", wlcReset);
};

const wlcSwitch = (
  tarNum,
  tarAct = document.querySelector(`[data-number="${tarNum}"]`),
  curAct = document.querySelector(".welcome-slider-numbering__active")
) => {
  if (shift < -5000) {
    tarNum = 1;
  }
  if (shift > -1000) {
    tarNum = 5;
  }

  tarAct = document.querySelector(`[data-number="${tarNum}"]`);

  const number = document.querySelector(".welcome-slider-counter-first");

  curAct.classList.toggle("welcome-slider-numbering__active");
  tarAct.classList.toggle("welcome-slider-numbering__active");

  number.innerText = `0${tarNum}`;

  wlcSliderWrp.style = `transform: translateX(${shift}px); transition: transform .5s;`;

  if (shift === 0) {
    shift = -5000;
    wlcSliderWrp.addEventListener("transitionend", wlcReset);
  }
  if (shift === -6000) {
    shift = -1000;
    wlcSliderWrp.addEventListener("transitionend", wlcReset);
  }

  const wlcExit = () => {
    welcomeControls.addEventListener("click", wlcChooseAct);
    wlcSliderWrp.removeEventListener("transitionend", wlcExit);
  };

  wlcSliderWrp.addEventListener("transitionend", wlcExit);
};

const arr1 = [
  "welcome-slider-numbering__item",
  "welcome-slider-controls-prev",
  "welcome-slider-controls-next",
];

const wlcChooseAct = (e) => {
  for (let i = 0; i < arr1.length; i++) {
    if (e.target.classList.contains(arr1[i])) break;
    if (i === arr1.length - 1) return;
  }

  welcomeControls.removeEventListener("click", wlcChooseAct);

  const target = e.target;
  const curAct = welcomeControls.querySelector(
    ".welcome-slider-numbering__active"
  );
  const curNum = +curAct.dataset.number;
  const MIN = 0;
  const MAX = 6;
  let tarAct, tarNum;

  if (target.classList.contains(arr1[0])) {
    tarNum = +target.dataset.number;
    tarAct = e.target;
  }

  if (target.classList.contains(arr1[1])) {
    tarNum = curNum > MIN ? curNum - 1 : MAX;
  }

  if (target.classList.contains(arr1[2])) {
    tarNum = curNum < MAX ? curNum + 1 : MIN;
  }

  shift = -(imageWidth * tarNum);

  if (tarNum === 0) tarNum = 5;
  if (tarNum === 6) tarNum = 1;

  tarAct = welcomeControls.querySelector(`[data-number="${tarNum}"]`);

  wlcSwitch(tarNum, tarAct, curAct);
};

welcomeControls.addEventListener("click", wlcChooseAct);

const threshold = 250;
let hor1 = 0,
  hor2 = 0;
let posInitial, posFinal;

wlcSliderWrp.addEventListener("mousedown", dragStart);

wlcSliderWrp.addEventListener("touchstart", dragStart);
wlcSliderWrp.addEventListener("touchend", dragEnd);
wlcSliderWrp.addEventListener("touchmove", dragAction);

const getCurShift = () =>
  new WebKitCSSMatrix(window.getComputedStyle(wlcSliderWrp).transform).m41;
const round = (a, b) => Math.round(a / b) * b;

function dragStart(e) {
  e = e || window.event;
  e.preventDefault();
  posInitial = round(getCurShift(), 1000);

  if (e.type == "touchstart") {
    hor1 = e.touches[0].clientX;
  } else {
    hor1 = e.clientX;
    window.addEventListener("mouseup", dragEnd);
    document.addEventListener("mousemove", dragAction);
  }
}

function dragAction(e) {
  e = e || window.event;

  if (e.type == "touchmove") {
    hor2 = hor1 - e.touches[0].clientX;
    hor1 = e.touches[0].clientX;
  } else {
    hor2 = hor1 - e.clientX;
  }
  wlcSliderWrp.style = `transform: translateX(${
    posInitial - hor2
  }px); transition: transform .5s;`;
}

function dragEnd(e) {
  posFinal = getCurShift();
  if (posFinal - posInitial < -threshold) {
    shift = round(posFinal, 1000);
    let tarNum = shift >= 0 ? shift.toString()[0] : shift.toString()[1];
    wlcSwitch(tarNum);
  } else if (posFinal - posInitial > threshold) {
    shift = round(posFinal, 1000);
    let tarNum = shift >= 0 ? shift.toString()[0] : shift.toString()[1];
    wlcSwitch(tarNum);
  } else {
    wlcSliderWrp.style = `transform: translateX(${posInitial}px); transition: transform .5s;`;
  }

  document.removeEventListener("mousemove", dragAction);
  window.removeEventListener("mouseup", dragEnd);
}
