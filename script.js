////////////////////////////////////////////////

let tip = '';
let amountOfPeople;
let billAmount;
let customTip;
const tipButtons = document.querySelectorAll('.btn');

const tipButtonReset = () => {
   tipButtons.forEach((btn) => {
      btn.style.backgroundColor = 'hsl(183, 100%, 15%)';
      btn.style.color = 'hsl(0, 0%, 100%)';
   });
};

// GETS INPUT FROM DOCUMENT

const getInputs = () => {
   amountOfPeople = parseInt(document.getElementById('people').value);
   billAmount = parseFloat(document.getElementById('bill').value);
};

// VALIDATES IF ANYTHING WAS ENTERED INTO THE INPUT

const checkInputs = () => {
   getInputs();
   if (isNaN(billAmount) || isNaN(amountOfPeople)) {
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

// UPDATES BUTTON STYLE WHEN CLICKED AND UPDATES STYLES

tipButtons.forEach((btn) =>
   btn.addEventListener('click', (e) => {
      tipButtonReset();
      btn.style.backgroundColor = 'hsl(172, 67%, 45%)';
      btn.style.color = '#111';
      tip = parseFloat(e.target.innerText) / 100;
      document.getElementById('tip').value = '';
      checkInputs();
   })
);

// UPDATES TIP PER PERSON AMOUNT

document.getElementById('people').addEventListener('input', () => {
   checkInputs();
});

// UPDATES TOTAL BILL PER PERSON AMOUNT

document.getElementById('bill').addEventListener('input', () => {
   checkInputs();
});

document.getElementById('tip').addEventListener('input', () => {
   tipButtonReset();
   tip = parseInt(document.getElementById('tip').value) / 100;
   checkInputs();
});

document.getElementById('reset').addEventListener('click', () => {
   document.getElementById('bill').value = '';
   document.getElementById('tip').value = '';
   document.getElementById('people').value = '';
   document.getElementById('total-people').innerText = '$0.00';
   document.getElementById('total-amount').innerText = '$0.00';
   tipButtonReset();
});
