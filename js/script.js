const burgerButton = document.querySelector(".burger-button");
const navList = document.querySelector(".header-nav__list");
const welcomeDesc = document.querySelector(".welcome-desc-container");
const bgmBottom = document.querySelector(".burger-menu-bottom");
const body = document.body;

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const toggleBurgerMenu = () => {
  navList.classList.toggle("visible-burger");
  welcomeDesc.classList.toggle("burger-nonvisible");
  bgmBottom.classList.toggle("burger-menu-bottom-visible");
  burgerButton.classList.toggle("cross-button");
};

const closeBurgerMenu = (e) => {
  if (
    (!e.target.closest(".header-nav__list") &&
      !e.target.closest(".burger-button") &&
      !e.target.closest(".burger-menu-bottom")) ||
    e.target.closest(".header-nav__link")
  ) {
    toggleBurgerMenu();
    window.removeEventListener("click", closeBurgerMenu);
  }
};

burgerButton.addEventListener("click", () => {
  toggleBurgerMenu();
  window.addEventListener("click", closeBurgerMenu);
});

const timeline = document.querySelector(".video-controls-timeline");
document.querySelector("iframe").contentWindow.postMessage("text", "*");
