const DARK_RED = "rgb(113, 7, 7)";
const GRAY = "rgb(196, 196, 196)";

const customVideoplayer = document.querySelector(".custom-videoplayer");
const video = document.querySelector(".video-section__video");
const custVidPlControls = document.querySelector(".video-controls-container");

const bigPlayButton = document.querySelector(".custom-videoplayer__big-play");
const playButton = document.querySelector(".play-video");
const pauseButton = document.querySelector(".pause-video");
const muteButton = document.querySelector(".mute-video");
const unmuteButton = document.querySelector(".unmute-video");
const fullscreenButton = document.querySelector(".full-screen");
const fullscreenExitButton = document.querySelector(".exit-full-screen");
const timelineRange = document.querySelector(".video-controls-timeline");
const volumeRange = document.querySelector(".video-controls-volume");
const videoRate = document.querySelector(".video-rate");

const toggleVisible = (...buttons) => {
  buttons.forEach((elem) => {
    elem.classList.toggle("video-controls-def-nonvisible");
  });
};

const togglePlay = () => {
  if (video.paused) video.play();
  else video.pause();
  toggleVisible(playButton, pauseButton, bigPlayButton);
};

const playVideo = () => {
  video.play();
  toggleVisible(playButton, pauseButton, bigPlayButton);
};
const pauseVideo = () => {
  video.pause();
  toggleVisible(playButton, pauseButton, bigPlayButton);
};

const fullscreenVideo = () => {
  customVideoplayer.webkitRequestFullScreen();
  video.classList.toggle("full-height-video");
  custVidPlControls.classList.toggle("full-height-controls");
  toggleVisible(fullscreenButton, fullscreenExitButton);
};
const fullscreenExitVideo = () => {
  document.webkitExitFullscreen();
  video.classList.toggle("full-height-video");
  custVidPlControls.classList.toggle("full-height-controls");
  toggleVisible(fullscreenButton, fullscreenExitButton);
};
const toggleFullscreenVideo = () => {
  document.fullscreenElement ? fullscreenExitVideo() : fullscreenVideo();
};
const timelineVideo = () => {
  let length;
  if (video.duration && video.currentTime)
    length = (video.currentTime / video.duration) * 100;
  else length = 0;
  timelineRange.value = `${length}`;
  timelineRange.setAttribute("value", `${length}`);
  timelineRange.style.background = `linear-gradient(to right, ${DARK_RED} 0%, ${DARK_RED} ${length}%, ${GRAY} ${length}%, ${GRAY} 100%)`;
  if (video.currentTime === video.duration) pauseVideo();
};

const changeTimelineVideo = (e) => {
  video.currentTime = (e.offsetX / timelineRange.offsetWidth) * video.duration;
};

const rangeBackground = function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, ${DARK_RED} 0%, ${DARK_RED} ${value}%, ${GRAY} ${value}%, ${GRAY} 100%)`;
};

function changeVolumeVideo() {
  video.volume = volumeRange.value;
  if (video.volume === 0) {
    video.muted = true;
    if (!muteButton.classList.contains("video-controls-def-nonvisible"))
      toggleVisible(muteButton, unmuteButton);
  } else {
    video.muted = false;
    if (!unmuteButton.classList.contains("video-controls-def-nonvisible"))
      toggleVisible(muteButton, unmuteButton);
  }
  volumeRange.style.background = `linear-gradient(to right, ${DARK_RED} 0%, ${DARK_RED} ${
    video.volume * 100
  }%, ${GRAY} ${video.volume * 100}%, ${GRAY} 100%)`;
}

function toggleMuteVideo() {
  video.muted = !video.muted;
  toggleVisible(muteButton, unmuteButton);
  if (video.muted) {
    video.volume = 0;
    volumeRange.value = 0;
    volumeRange.style.background = `linear-gradient(to right, ${DARK_RED} 0%, ${DARK_RED} ${
      video.volume * 100
    }%, ${GRAY} ${video.volume * 100}%, ${GRAY} 100%)`;
  } else {
    video.volume = 0.5;
    volumeRange.value = 0.5;
    volumeRange.style.background = `linear-gradient(to right, ${DARK_RED} 0%, ${DARK_RED} ${
      video.volume * 100
    }%, ${GRAY} ${video.volume * 100}%, ${GRAY} 100%)`;
  }
}

const showRate = () => {
  videoRate.innerText = `${video.playbackRate}x`;
  videoRate.style = "padding: 5px 10px;";
  setTimeout(() => {
    videoRate.innerText = "";
    videoRate.style = "";
  }, 1500);
};

const incSpeed = () => {
  if (video.playbackRate < 2) video.playbackRate += 0.25;
  showRate();
};

const decSpeed = () => {
  if (video.playbackRate > 0.25) video.playbackRate -= 0.25;
  showRate();
};

const controlKeys = (e) => {
  let vidSectCoords = document
    .querySelector(".video-section")
    .getBoundingClientRect();
  let vidSectTop = vidSectCoords.top + scrollY;
  let vidSectBot = vidSectCoords.bottom + scrollY;
  if (scrollY > vidSectTop && scrollY < vidSectBot) {
    e.preventDefault();
    e.code === "Space" ? togglePlay() : null;
    e.key === "m" || e.key === "ь" || e.key === "M" || e.key === "Ь"
      ? toggleMuteVideo()
      : null;
    e.key === "f" || e.key === "а" || e.key === "F" || e.key === "А"
      ? toggleFullscreenVideo()
      : null;
    e.key === "<" || e.key === "Б" ? incSpeed() : null;
    e.key === ">" || e.key === "Ю" ? decSpeed() : null;
  }
};

let mouseDown = false;

document.addEventListener("keydown", controlKeys);

timelineRange.addEventListener("input", rangeBackground);
timelineRange.addEventListener("click", changeTimelineVideo);
timelineRange.addEventListener("mousemove", (e) => {
  if (mouseDown) changeTimelineVideo(e);
});
timelineRange.addEventListener("mousedown", () => (mouseDown = true));
timelineRange.addEventListener("mouseup", () => (mouseDown = false));
volumeRange.addEventListener("input", rangeBackground);
volumeRange.addEventListener("input", changeVolumeVideo);

video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", timelineVideo);
bigPlayButton.addEventListener("click", playVideo);
playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);
muteButton.addEventListener("click", toggleMuteVideo);
unmuteButton.addEventListener("click", toggleMuteVideo);
fullscreenButton.addEventListener("click", fullscreenVideo);
fullscreenExitButton.addEventListener("click", fullscreenExitVideo);
