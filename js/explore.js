const exploreControl = document.querySelector(".explore-control");
const exploreBefore = document.querySelector(".explore-before-container");

exploreControl.addEventListener("mousedown", exploreDragStart);
exploreControl.addEventListener("touchstart", exploreDragStart);
exploreControl.addEventListener("touchend", exploreDragEnd);
exploreControl.addEventListener("touchmove", exploreDragAction);

function exploreDragStart(e) {
  e = e || window.event;
  e.preventDefault();
  posInitial = exploreControl.offsetLeft;

  if (e.type == "touchstart") {
    hor1 = e.touches[0].clientX;
  } else {
    hor1 = e.clientX;
    window.addEventListener("mouseup", exploreDragEnd);
    document.addEventListener("mousemove", exploreDragAction);
  }
}

function exploreDragAction(e) {
  e = e || window.event;

  if (e.type == "touchmove") {
    hor2 = hor1 - e.touches[0].clientX;
    hor1 = e.touches[0].clientX;
  } else {
    hor2 = hor1 - e.clientX;
  }

  if (
    posInitial - hor2 >= 0 - exploreControl.offsetWidth / 2 &&
    posInitial - hor2 <=
      exploreControl.parentElement.offsetWidth - exploreControl.offsetWidth / 2
  ) {
    exploreControl.style.left = `${posInitial - hor2}px`;
    exploreBefore.style.width = `${
      posInitial - hor2 + exploreControl.offsetWidth / 2
    }px`;
    exploreBefore.style.maxWidth = exploreBefore.style.width;
  }
}

function exploreDragEnd(e) {
  document.removeEventListener("mousemove", exploreDragAction);
  window.removeEventListener("mouseup", exploreDragEnd);
}
