let images = [];

let repo = document.createDocumentFragment();

const randomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

for (let i = 1; i <= 15; i++) {
  let imageNumber = randomNum(1, 15);
  while (images.includes(imageNumber)) imageNumber = randomNum(1, 15);
  images.push(imageNumber);

  const img = document.createElement("img");
  img.classList.add("gallery-container__image");
  img.src = `assets/img/galery/galery${imageNumber}.jpeg`;
  img.alt = `${imageNumber}`;
  repo.appendChild(img);
}

const leftGal = document.querySelector(".gallery-container__left");
const centerGal = document.querySelector(".gallery-container__center");
const rightGal = document.querySelector(".gallery-container__right");

for (let i = 0; i < 15; i++) {
  if (i === 0) {
    repo.children[0].classList.add("margin-gallery");
    leftGal.appendChild(repo.children[0]);
  }
  if (i > 0 && i < 5) leftGal.appendChild(repo.children[0]);
  if (i >= 5 && i < 10) centerGal.appendChild(repo.children[0]);
  if (i === 10) {
    repo.children[0].classList.add("margin-gallery");
    rightGal.appendChild(repo.children[0]);
  }
  if (i > 10 && i < 15) rightGal.appendChild(repo.children[0]);
}

const galImages = document.querySelectorAll(".gallery-container__image");

const moveGallery = () => {
  for (let i = 0; i < galImages.length; i++) {
    const elem = galImages[i];
    const elemHeight = elem.offsetHeight;
    let ed = innerHeight - elemHeight / 30;
    const elemOffset = elem.getBoundingClientRect().top + scrollY;
    if (elemHeight > innerHeight) ed = innerHeight - innerHeight / 30;
    if (scrollY < elemOffset + elemHeight && scrollY > elemOffset - ed) {
      elem.classList.add("move-gallery");
    } else elem.classList.remove("move-gallery");
  }
};

const checkScrollArea = () => {
  const galSectCoords = document
    .querySelector(".gallery-section")
    .getBoundingClientRect();
  const galSectTop = galSectCoords.top + scrollY;
  const galSectBot = galSectCoords.bottom + scrollY;
  if (scrollY > galSectTop / 2 && scrollY < galSectBot + 2000) moveGallery();
};

window.addEventListener("scroll", checkScrollArea);

window.addEventListener("load", checkScrollArea);
