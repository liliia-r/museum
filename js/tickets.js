let curChecked;
document.querySelectorAll(".ticket-type-radio").forEach((elem) => {
  if (elem.checked) curChecked = elem;
});
const tumbler = (e) => {
  curChecked.toggleAttribute("checked");
  document.querySelector(".checked").classList.toggle("checked");
  e.target.toggleAttribute("checked");
  e.target.parentNode.classList.toggle("checked");
  curChecked = e.target;
  amountCalc();
};
const radioButtons = document.querySelectorAll(".ticket-type-radio");

radioButtons.forEach((elem) => {
  elem.addEventListener("click", tumbler);
});

const count18 = document.getElementsByName("ticket-count-18")[0];
const count65 = document.getElementsByName("ticket-count-65")[0];
const count18Minus = document.getElementById("count18-");
const count18Plus = document.getElementById("count18+");
const count65Minus = document.getElementById("count65-");
const count65Plus = document.getElementById("count65+");

const basicTicket = document.querySelector('[name="ticket-count-18"]');
const seniorTicket = document.querySelector('[name="ticket-count-65"]');
const totalCost = document.querySelector(".total-cost");
const ticketType = document.querySelectorAll(".ticket-type-radio");

const getTypeAmount = () =>
  +[...ticketType].find((elem) => elem.checked).dataset.amount;

const amountCalc = () => {
  const typeAmount = getTypeAmount();
  const basicTicketCount = +basicTicket.value;
  const seniorTicketCount = +seniorTicket.value;
  totalCost.innerText =
    basicTicketCount * typeAmount + seniorTicketCount * (typeAmount / 2);
  window.localStorage.setItem("typeAmount", `${typeAmount}`);
  window.localStorage.setItem("basicTicketCount", `${basicTicketCount}`);
  window.localStorage.setItem("seniorTicketCount", `${seniorTicketCount}`);
  window.localStorage.setItem("totalCost", totalCost.innerText);
};

if (window.localStorage.getItem("totalCost") !== null) {
  curChecked.toggleAttribute("checked");
  curChecked.parentNode.classList.toggle("checked");
  curChecked = document.querySelector(
    `[data-amount="${window.localStorage.getItem("typeAmount")}"]`
  );
  curChecked.toggleAttribute("checked");
  curChecked.parentNode.classList.toggle("checked");
  basicTicket.setAttribute(
    "value",
    window.localStorage.getItem("basicTicketCount")
  );
  seniorTicket.setAttribute(
    "value",
    window.localStorage.getItem("seniorTicketCount")
  );
  totalCost.innerText = window.localStorage.getItem("totalCost");
}

count18Minus.addEventListener("click", () => {
  if (count18.value > 0) count18.setAttribute("value", `${+count18.value - 1}`);
  amountCalc();
});

count18Plus.addEventListener("click", () => {
  if (count18.value < 20)
    count18.setAttribute("value", `${+count18.value + 1}`);
  amountCalc();
});

count65Minus.addEventListener("click", () => {
  if (count65.value > 0) count65.setAttribute("value", `${+count65.value - 1}`);
  amountCalc();
});

count65Plus.addEventListener("click", () => {
  if (count65.value < 20)
    count65.setAttribute("value", `${+count65.value + 1}`);
  amountCalc();
});

const selected = document.querySelector(".selected");
const selectList = document.querySelector(".select-list");
selected.addEventListener("click", () => {
  selectList.classList.toggle("nonvisible");
});
