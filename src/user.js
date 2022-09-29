export const radioValue = {
  5000: {
    className: 'range-desktop',
  },
  2000: {
    className: 'range-tablet',
  },
  1000: {
    className: 'range-tablet',
  },
  500: {
    className: '',
  },
  250: {
    className: '',
  },
  100: {
    className: '',
  },
  50: {
    className: '',
  },
  25: {
    className: '',
  },
};

const rangeContainer = document.querySelector('.range__container');
const amount = document.querySelector('.input-amount');
let oldValue = '';

function createRadioButton({ price, key, className = '', object }) {
  const element = document.createElement('div');
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'radio';
  input.classList.add('radio-input');
  input.id = `radio${key}`;

  console.log('CLASS', className);

  element.classList.add('radio__wrapper', 'range__radio', 'radio');
  const inner = `
  <label class="radio__label" for="radio${key}" >
  <span class="radio__mark radio__mark-range"></span>
  <p class="range__step-text">${price}</p>
  </label>
  `;

  element.innerHTML = inner;
  element.prepend(input);
  console.log(input);
  object[price].input = input;

  input.addEventListener('change', (event) => {
    // alert(event.target);
    console.log(event.target);
    if (event.target.checked === true) {
      // alert('');
      amount.value = price;
    }
  });
  // alert(element);
  console.log(element);

  return element;
}

const radioArray = Object.entries(radioValue).map((a, key) => {
  console.log(a);
  return createRadioButton({
    price: a[0],
    key,
    className: a[1].className,
    object: radioValue,
  });
});

const prices = Object.keys(radioValue);

amount.addEventListener('input', (e) => {
  e.preventDefault();
  const value = e.target.value;
  if (value.length <= 4) {
    if (prices.includes(value)) {
      console.log('fff');
      radioValue[value].input.checked = true;
    }
    oldValue = value;

    e.target.value = value;
  } else {
    e.target.value = oldValue;
  }
});

rangeContainer.innerHTML = '';
rangeContainer.append(...radioArray.reverse());
console.log(radioValue);
// alert(rangeContainer);
