const videoControls = document.querySelector(".video-slider-controls__list");

const videoSlides = document.querySelector(".video-slides");
const videoListElems = document.querySelectorAll(".video-slider__elem");
const videoList = document.querySelector(".video-slider__list");

const firstVideoSlide = videoListElems[0].cloneNode(true);
const lastVideoSlide = videoListElems[videoListElems.length - 1].cloneNode(
  true
);

const getVideoShift = (videoTarNum) =>
  -(videoTarNum + 4) * (videoList.offsetWidth / 15) -
  28 * ((videoTarNum + 4) / 2);

videoList.appendChild(firstVideoSlide);
videoList.prepend(lastVideoSlide);

for (let i = 1; i < videoListElems.length - 1; i++) {
  videoList.appendChild(videoListElems[i].cloneNode(true));
}

for (let i = videoListElems.length - 2; i > 0; i--) {
  videoList.prepend(videoListElems[i].cloneNode(true));
}

const updateVidSliderList = document.querySelectorAll(".yt-video");
updateVidSliderList.forEach((elem, i) => {
  elem.setAttribute("id", `yt${i + 1}`);
});

const pauseAllVids = () => {
  const arrAPI = [
    playerAPI1,
    playerAPI2,
    playerAPI3,
    playerAPI4,
    playerAPI5,
    playerAPI6,
    playerAPI7,
    playerAPI8,
    playerAPI9,
    playerAPI10,
    playerAPI11,
    playerAPI12,
    playerAPI13,
  ];
  arrAPI.forEach((elem) => {
    elem.pauseVideo();
  });
};

const onPlayerStateChange = (e) => {
  if (e.data === 1) {
    const arrAPI = [
      playerAPI1,
      playerAPI2,
      playerAPI3,
      playerAPI4,
      playerAPI5,
      playerAPI6,
      playerAPI7,
      playerAPI8,
      playerAPI9,
      playerAPI10,
      playerAPI11,
      playerAPI12,
      playerAPI13,
    ];
    arrAPI.forEach((elem) => {
      if (e.target !== elem) {
        elem.pauseVideo();
      }
    });
  }
};

let playerAPI1,
  playerAPI2,
  playerAPI3,
  playerAPI4,
  playerAPI5,
  playerAPI6,
  playerAPI7,
  playerAPI8,
  playerAPI9,
  playerAPI10,
  playerAPI11,
  playerAPI12,
  playerAPI13;
function onYouTubeIframeAPIReady() {
  playerAPI1 = new YT.Player("yt1", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI2 = new YT.Player("yt2", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI3 = new YT.Player("yt3", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI4 = new YT.Player("yt4", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI5 = new YT.Player("yt5", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI6 = new YT.Player("yt6", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI7 = new YT.Player("yt7", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI8 = new YT.Player("yt8", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI9 = new YT.Player("yt9", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI10 = new YT.Player("yt10", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI11 = new YT.Player("yt11", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI12 = new YT.Player("yt12", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
  playerAPI13 = new YT.Player("yt13", {
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

const videoReset = () => {
  videoList.style = `transform: translateX(${videoShift}px);`;
  videoList.removeEventListener("transitioned", videoReset);
};

const vidSwitch = (videoCurAct, videoTarAct, videoTarNum) => {
  videoShift = getVideoShift(videoTarNum);

  videoList.style = `transform: translateX(${videoShift}px); transition: transform .5s;`;

  if (videoShift < getVideoShift(5)) {
    videoTarNum = 1;
    videoList.addEventListener("transitionend", videoReset);
  }
  if (videoShift > getVideoShift(1)) {
    videoTarNum = 5;
    videoList.addEventListener("transitionend", videoReset);
  }

  videoShift = getVideoShift(videoTarNum);

  videoTarAct = videoControls.querySelector(`[data-number="${videoTarNum}"]`);

  const video = document.querySelector(".video-section__video");

  videoCurAct.classList.toggle("video-slider-controls__leading");
  videoTarAct.classList.toggle("video-slider-controls__leading");

  video.setAttribute("src", `assets/video/video${videoTarNum}.mp4`);
  video.poster = `assets/video/poster${videoTarNum}.jpg`;

  const videoExit = () => {
    videoControls.addEventListener("click", vidChooseAct);
    videoList.removeEventListener("transitionend", videoExit);
  };

  videoList.addEventListener("transitionend", videoExit);
};

const vidChooseAct = (e) => {
  if (e.target === videoControls) return;

  videoControls.removeEventListener("click", vidChooseAct);

  const target = e.target;
  const videoCurAct = videoControls.querySelector(
    ".video-slider-controls__leading"
  );
  const curNum = +videoCurAct.dataset.number;
  const MIN = 0;
  const MAX = 12;
  let videoTarAct, videoTarNum;

  pauseAllVids();

  if (!pauseButton.classList.contains("video-controls-def-nonvisible")) {
    pauseButton.classList.add("video-controls-def-nonvisible");
    playButton.classList.remove("video-controls-def-nonvisible");
    bigPlayButton.classList.remove("video-controls-def-nonvisible");
  }

  if (target.classList.contains("video-slider-controls__select")) {
    videoTarNum = +target.dataset.number;
    videoTarAct = e.target;
  }

  if (target.classList.contains("video-slider-controls__prev")) {
    videoTarNum = curNum > MIN ? curNum - 1 : MAX;
  }

  if (target.classList.contains("video-slider-controls__next")) {
    videoTarNum = curNum < MAX ? curNum + 1 : MIN;
  }

  videoTarAct = videoControls.querySelector(`[data-number="${videoTarNum}"]`);

  vidSwitch(videoCurAct, videoTarAct, videoTarNum);
};

videoControls.addEventListener("click", vidChooseAct);
