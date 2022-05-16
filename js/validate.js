const ticketsName = document.querySelector(".tickets-name");
const ticketsEmail = document.querySelector(".tickets-email");
const ticketsPhone = document.querySelector(".tickets-phone");

const errorName = document.querySelector(".name-error");
const errorEmail = document.querySelector(".email-error");
const errorPhone = document.querySelector(".phone-error");

const checkName = (e) => {
  const content = e.target.value;
  const reg = /[^а-яА-ЯЁё-іa-zA-Z\s]+/gm;
  if (content.match(reg)) return "Incorrect input. Only letters and spaces.";
  if (content.length < 3 || content.length > 15)
    return "Incorrect input. Сharacters must be more than 3 and less than 15";
};

const checkEmail = (e) => {
  const content = e.target.value;
  const reg = /[\w\d\_\-]{3,15}@[a-z]{4,}\.[a-z]{2,}/gm;
  const username = content.split("@");
  if (username[0].length > 15 || username[0].length < 3)
    return "Incorrect username. Сharacters must be more than 3 and less than 15";
  if (username.length < 2) return 'Email must have "@"';
  const domain = username[1].split(".");
  if (domain[0].length < 4) return "Domain zone must be more than 4 characters";
  if (domain.length < 2) return 'Must be "." after the domain name';
  if (domain[1].length < 2) return "Domain zone must be more than 2 characters";
  if (!content.match(reg))
    return 'Only letters, nums, "_" or "-" in username. Only letters in domain';
};

const checkPhone = (e) => {
  const content = e.target.value;
  const reg = [/[^\d\-\s]/gm, /\d/gm, /((\-?|\s?)\d{2,3}){1,5}/gm];
  if (content.match(reg[0])) return 'Only numbers, spaces or "-"';
  if (content.match(reg[1]) && content.match(reg[1]).length > 10)
    return "Phone number can not be more 10 nums";
  if (content !== content.match(reg[1]).join("")) {
    if (!content.match(reg[2]) || content.match(reg[2])[0] !== content)
      return 'Only 2 to 3 digits if separated("-" or space).';
  }
};

ticketsName.addEventListener("change", (e) => {
  let err;
  err = checkName(e);
  if (err !== undefined) {
    ticketsName.classList.add("error");
    errorName.innerText = err;
  } else {
    ticketsName.classList.remove("error");
    errorName.innerText = "";
  }
});

ticketsEmail.addEventListener("change", (e) => {
  let err;
  err = checkEmail(e);
  if (err !== undefined) {
    ticketsEmail.classList.add("error");
    errorEmail.innerText = err;
  } else {
    ticketsEmail.classList.remove("error");
    errorEmail.innerText = "";
  }
});

ticketsPhone.addEventListener("change", (e) => {
  let err;
  err = checkPhone(e);
  if (err !== undefined) {
    ticketsPhone.classList.add("error");
    errorPhone.innerText = err;
  } else {
    ticketsPhone.classList.remove("error");
    errorPhone.innerText = "";
  }
});
