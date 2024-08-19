const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/";

const selectCurrency =  document.querySelectorAll("select");
const msg = document.querySelector('.msg');
const converter = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector('a');

for (let select of selectCurrency) {
    for (let countryCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = countryCode;
        newOption.value = countryList[countryCode];
        
        if (select.name === 'from' && countryCode === 'USD') {
            newOption.selected = 'selected';
        } else if (select.name === 'to' && countryCode === 'PKR') {
            newOption.selected = 'selected';
        }

        select.append(newOption);
    }

    select.addEventListener('change', (event) => {
        updateFlag(event.target);
    });
};

const updateFlag = (element) => {
    let decideFlag = element.value;
    let newSrc = `https://flagsapi.com/${decideFlag}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const getExchangeRate = async () => {
    let amount = document.querySelector('input');
    let amountVal = amount.value;
    if ( amountVal < 1 || amountVal === '') {
        amountVal = 1;
        amount.value = "1";
    }
    
    const selectedFromCurrency = fromCurr.options[fromCurr.selectedIndex].innerText.toLowerCase();
    const selectedToCurrency = toCurr.options[toCurr.selectedIndex].innerText.toLowerCase();

    const URL = `${url}${selectedFromCurrency}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[selectedFromCurrency][selectedToCurrency];

    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${selectedFromCurrency.toUpperCase()}= ${finalAmount} ${selectedToCurrency.toUpperCase()}`;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    getExchangeRate();
  });
  
  window.addEventListener("load", () => {
    getExchangeRate();
  });