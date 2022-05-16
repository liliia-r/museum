const buyButton = document.querySelector(".ticket-buy-button");
const modalWindow = document.querySelector(".modal-window");

const overlay = document.querySelector(".modal-window-overlay");
const closeButton = document.querySelector(".modal-window-close-button");

const togVisModalWindow = function () {
  modalWindow.classList.toggle("opened");
  overlay.classList.toggle("overlay-opened");
};

buyButton.addEventListener("click", togVisModalWindow);
closeButton.addEventListener("click", togVisModalWindow);

const button = document.querySelector(".modal-window-pay-button");

button.addEventListener("click", addElement);

function addElement(e) {
  const x = e.clientX;
  const y = e.clientY;
  const buttonCoords = this.getBoundingClientRect();
  const xInside = x - buttonCoords.left;
  const yInside = y - buttonCoords.top;

  const circle = document.createElement("span");
  circle.classList.add("pulsar");
  circle.style.top = yInside + "px";
  circle.style.left = xInside + "px";

  this.appendChild(circle);
  setTimeout(() => circle.remove(), 500);
}

const basicMinus = document.querySelector(".basic-minus");
const basicPlus = document.querySelector(".basic-plus");
const seniorMinus = document.querySelector(".senior-minus");
const seniorPlus = document.querySelector(".senior-plus");
const basicTicketsCount = document.querySelector(".basic-tickets-count");
const seniorTicketsCount = document.querySelector(".senior-tickets-count");
const tcktCntBasic = document.querySelector(".ticket-count-basic");
const tcktCntSenior = document.querySelector(".ticket-count-senior");
const tcktTypeBasic = document.querySelector(".ticket-type-basic");
const tcktTypeSenior = document.querySelector(".ticket-type-senior");
const tcktCstBasic = document.querySelector(".ticket-cost-basic");
const tcktCstSenior = document.querySelector(".ticket-cost-senior");
const ticketPriceBasic = document.querySelectorAll(".ticket-price-basic");
const ticketPriceSenior = document.querySelectorAll(".ticket-price-senior");
const resultCost = document.querySelector(".result-cost-value");
const ticketTypeSelect = document.querySelector(".ticket-type-select");
const selectedType = document.querySelector(".selected");
const permOpt = document.querySelector(".perm-opt");
const tempOpt = document.querySelector(".temp-opt");
const combOpt = document.querySelector(".comb-opt");
const checkType = document.querySelector(".check");
const checkDate = document.querySelector(".date-date");
const checkTime = document.querySelector(".date-time");
const dateInput = document.querySelector(".date-date-input");
const timeInput = document.querySelector(".date-time-input");

const getTypeAmountForm = () => {
  return +ticketTypeSelect.querySelector(`[value="${ticketTypeSelect.value}"]`)
    .dataset.amount;
};

const amountCalcForm = () => {
  const typeAmount = getTypeAmountForm();
  const basicTicketsCountForm = +basicTicketsCount.value;
  const seniorTicketsCountForm = +seniorTicketsCount.value;
  resultCost.innerText =
    basicTicketsCountForm * typeAmount +
    seniorTicketsCountForm * (typeAmount / 2);
};

const prepareForm = () => {
  const typeAmount = getTypeAmountForm();
  tcktCntBasic.innerText = basicTicketsCount.value;
  tcktCntSenior.innerText = seniorTicketsCount.value;
  ticketPriceBasic.forEach((elem) => {
    elem.innerText = typeAmount;
  });
  ticketPriceSenior.forEach((elem) => {
    elem.innerText = typeAmount / 2;
  });
  tcktCstBasic.innerText =
    tcktCntBasic.innerText * ticketPriceBasic[0].innerText;
  tcktCstSenior.innerText =
    tcktCntSenior.innerText * ticketPriceSenior[0].innerText;
};

const curDate = () => {
  const currentDate = new Date();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  const maxDate = `${year}-${month}-${day}`;
  dateInput.setAttribute("min", maxDate);
};

const sub = () => {
  let options = "";
  let start = 9;
  let bool = false;

  timeInput.setAttribute("list", "shedule");
  let shedule = document.createElement("datalist");
  shedule.setAttribute("id", "shedule");

  while (start < 19) {
    if (start == 18 && bool) break;
    let hours = start < 10 ? `0${start}` : start;
    let minutes = bool ? "30" : "00";
    let time = hours + ":" + minutes;
    options += `<option value="${time}" label="${time}">`;
    if (bool) start++;
    bool = !bool;
  }

  shedule.innerHTML = options;
  timeInput.after(shedule);
};

basicMinus.addEventListener("click", () => {
  if (basicTicketsCount.value > 0)
    basicTicketsCount.setAttribute("value", `${+basicTicketsCount.value - 1}`);
  amountCalcForm();
  prepareForm();
});

basicPlus.addEventListener("click", () => {
  if (basicTicketsCount.value < 20)
    basicTicketsCount.setAttribute("value", `${+basicTicketsCount.value + 1}`);
  amountCalcForm();
  prepareForm();
});

seniorMinus.addEventListener("click", () => {
  if (seniorTicketsCount.value > 0)
    seniorTicketsCount.setAttribute(
      "value",
      `${+seniorTicketsCount.value - 1}`
    );
  amountCalcForm();
  prepareForm();
});

seniorPlus.addEventListener("click", () => {
  if (seniorTicketsCount.value < 20)
    seniorTicketsCount.setAttribute(
      "value",
      `${+seniorTicketsCount.value + 1}`
    );
  amountCalcForm();
  prepareForm();
});

permOpt.addEventListener("click", () => {
  ticketTypeSelect.value = "perm";
  selectedType.innerText = permOpt.innerText;
  amountCalcForm();
  prepareForm();
});

tempOpt.addEventListener("click", () => {
  ticketTypeSelect.value = "temp";
  selectedType.innerText = tempOpt.innerText;
  amountCalcForm();
  prepareForm();
});

combOpt.addEventListener("click", () => {
  ticketTypeSelect.value = "comb";
  selectedType.innerText = combOpt.innerText;
  amountCalcForm();
  prepareForm();
});

dateInput.addEventListener("change", () => {
  if (dateInput.value !== "") dateInput.classList.add("have-val");
  else dateInput.classList.remove("have-val");
  const date = new Date(dateInput.value);
  console.log(date.getDay());
  const dayWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  checkDate.innerText = `${dayWeek[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}`;
});

timeInput.addEventListener("change", () => {
  if (timeInput.value !== "") timeInput.classList.add("have-val");
  else timeInput.classList.remove("have-val");
  const time = timeInput.value.split(":");
  checkTime.innerText = `${time[0]} : ${time[1]}`;
});

const pasteDataInForm = () => {
  const curType = ticketTypeSelect.querySelector(
    `[data-amount="${curChecked.dataset.amount}"]`
  );
  basicTicketsCount.setAttribute("value", count18.value);
  seniorTicketsCount.setAttribute("value", count65.value);
  tcktCntBasic.innerText = count18.value;
  tcktCntSenior.innerText = count65.value;
  resultCost.innerText = totalCost.innerText;
  ticketTypeSelect.value = curType.value;
  selectedType.innerText = checkType.innerText = curType.innerText;
  ticketPriceBasic.forEach((elem) => {
    elem.innerText = curType.dataset.amount;
  });
  ticketPriceSenior.forEach((elem) => {
    elem.innerText = +curType.dataset.amount / 2;
  });
  tcktCstBasic.innerText =
    tcktCntBasic.innerText * ticketPriceBasic[0].innerText;
  tcktCstSenior.innerText =
    tcktCntSenior.innerText * ticketPriceSenior[0].innerText;
};

buyButton.addEventListener("click", pasteDataInForm);
buyButton.addEventListener("click", curDate);
buyButton.addEventListener("click", sub);
