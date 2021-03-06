////////////////////////////////////////////////

let tip = '';
let amountOfPeople;
let billAmount;
let customTip;
let darkMode = false;
let container = document.querySelector('.container').style;
const tipButtons = document.querySelectorAll('.btn');

// Gets bill amount and the amount of people
const getValueFromInputs = () => {
   amountOfPeople = parseInt(document.getElementById('people').value);
   billAmount = parseFloat(document.getElementById('bill').value);
};

// VALIDATES IF ANYTHING WAS ENTERED INTO THE INPUT

const checkInputs = () => {
   getValueFromInputs();
   if (isNaN(billAmount) || isNaN(amountOfPeople) || isNaN(tip)) {
      return;
   }
   updateBill();
};

// UPDATES THE BILL AMOUNTS

const updateBill = () => {
   let totalPerPerson = (billAmount * tip + billAmount) / amountOfPeople;
   let tipPerPerson = (billAmount * tip) / amountOfPeople;

   document.getElementById(
      'total-people'
   ).innerText = `$${totalPerPerson.toFixed(2)}`;
   document.getElementById('total-amount').innerText = `$${tipPerPerson.toFixed(
      2
   )}`;
};

// UPDATES TIP PER PERSON AMOUNT AND TOTAL BILL PER PERSON AMOUNT

document.getElementById('people').addEventListener('input', checkInputs);
document.getElementById('bill').addEventListener('input', checkInputs);

document.getElementById('tip').addEventListener('input', () => {
   resetTipButtons();
   tip = parseInt(document.getElementById('tip').value) / 100;
   checkInputs();
});

// BUTTONS: Changes colors on buttons, and resets all other colors.
tipButtons.forEach((btn) =>
   btn.addEventListener('click', (e) => {
      resetTipButtons();
      btn.style.backgroundColor = 'hsl(172, 67%, 45%)';
      btn.style.color = '#111';
      tip = parseFloat(e.target.innerText) / 100;
      document.getElementById('tip').value = '';
      checkInputs();
   })
);

const resetTipButtons = () => {
   tipButtons.forEach((btn) => {
      btn.style.backgroundColor = '#eee';
      btn.style.color = 'hsl(0, 0%, 100%)';
   });
};

document.getElementById('reset').addEventListener('click', () => {
   document.getElementById('bill').value = '';
   document.getElementById('tip').value = '';
   document.getElementById('people').value = '';
   document.getElementById('total-people').innerText = '$0.00';
   document.getElementById('total-amount').innerText = '$0.00';
   resetTipButtons();
});

// Light mode and Dark mode
const lightModeProps = () => {
   document.body.style.backgroundColor = '#eee';
   let shapeFill = document.getElementsByClassName('shape-fill')[0].style;
   container.backgroundColor = '#eee';
   shapeFill.fill = '#eee';
   theme.src = './images/icon-moon.svg';
   let h4 = document.querySelectorAll('h4');
   h4.forEach((el) => {
      el.style.color = 'rgb(39, 78, 74)';
   });
   let inputs = document.querySelectorAll('input');
   inputs.forEach((input) => {
      input.style.color = '#eee';
   });
   document.getElementsByClassName('bill__input')[0].style.border =
      '1px dotted rgba(0, 0, 0, .1)';
   document.getElementsByClassName('people__input')[0].style.border =
      '1px dotted rgba(0, 0, 0, .1)';
   // console.log(document.getElementsByClassName('bill__input'));
   darkMode = false;
};

const darkModeProps = () => {
   let shapeFill = document.getElementsByClassName('shape-fill')[0].style;
   document.body.style.backgroundColor = '#04293A';
   shapeFill.fill = '#04293A';
   let h4 = document.querySelectorAll('h4');
   h4.forEach((el) => {
      el.style.color = '#eee';
   });
   document.getElementsByClassName('bill__input')[0].style.border =
      '1px dotted rgba(255, 255, 255, .1)';
   document.getElementsByClassName('people__input')[0].style.border =
      '1px dotted rgba(255, 255, 255, .1)';

   let inputs = document.querySelectorAll('input');
   inputs.forEach((input) => {
      input.style.color = '#eee';
      input.style.backgroundColor = '';
   });
   theme.src = './images/icon-sun.svg';
   darkMode = true;
   container.backgroundColor = '#04293A';
};

let theme = document.getElementById('theme-listener');
theme.addEventListener('click', () => {
   if (darkMode == false) {
      darkModeProps();
   } else if (darkMode == true) {
      lightModeProps();
   }
});
