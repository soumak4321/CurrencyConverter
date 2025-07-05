const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const form = document.getElementById('converter-form');

const API_URL = "https://api.exchangerate.host/latest";

async function loadCurrencies() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const currencies = Object.keys(data.rates);

  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (!amount || isNaN(amount)) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`${API_URL}?base=${from}&symbols=${to}`);
    const data = await res.json();

    if (!data.rates || !data.rates[to]) {
      resultDiv.textContent = "Conversion rate not available.";
      return;
    }

    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    resultDiv.textContent = "Error fetching data.";
    console.error(error);
  }
});

loadCurrencies();
