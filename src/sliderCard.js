import { restartTestimonialTimeout } from './slider';

const modalElement = document.querySelector('.modal');
const testimonialList = document.querySelector('.testimonial__list');

const popupElement = document.querySelector('.modal__child');
const popupContent = document.querySelector('.modal-content');
const closeBtn = document.querySelector('.testimonial__close');

function closeModalHandler() {
  modalElement.classList.remove('modal--active');
  popupContent.innerHTML = '';
  popupElement.classList.remove('modal__child--active');
  restartTestimonialTimeout();
}

closeBtn.addEventListener('click', (event) => {
  closeModalHandler();
});

modalElement.addEventListener('click', () => {
  closeModalHandler();
});

export function createRadioButton({ price, key, className = '' }) {
  const element = document.createElement('div');

  element.classList.add(
    'radio__wrapper',
    'range__radio',
    'range',
    'range-tablet',
    className
  );
  // <div class="radio__wrapper range__radio radio range-tablet">
  const inner = `
        <input class="radio-input" type="radio" id="radio${key}" name="radio" /><label
          class="radio__label"
          for="radio${key}"
          ><span class="radio__mark radio__mark-range"></span>
          <p class="range__step-text">${price}</p></label
        >
        `;
  // </div>
  element.innerHTML = inner;
  const radio = document.querySelector(`#radio${key}`);
  radio.addEventListener('change', (event) => {
    alert(event.target);
  });
  return element;
}
export function createAnimalCard({
  cardName,
  cardText,
  img,
  cardIcon,
  className = '',
}) {
  const element = document.createElement('div');

  element.classList.add('animals__item', 'card', 'card', className);
  // <div class="animals__item card card-panda ${className}">
  const inner = `
      <div class="card__img">
        <img src="${img}" />
        <div class="card__buf-img"></div>
      </div>
      <div class="card__content">
        <div class="card__desc card__show">
          <p class="card__name">${cardName}</p>
          <p class="card__text">${cardText}</p>
        </div>
        <div class="card__desc">
          <div class="card__name">${cardName}</div>
          <div class="card__text">${cardText}</div>
        </div>
        <img class="card__icon" src="${cardIcon}" />
      </div>
      `;
  // </div>
  element.innerHTML = inner;
  return element;
}

export function createTestimonialCard({
  text,
  name,
  date,
  place,
  icon = '/images/testimonial-0.png',
  callback = () => {
    return;
  },
}) {
  // <div class="testimonial__card border-gradient">
  const inner = `
    <div class="testimonial__card-background">
      
      <div class="testimonial__card-head">
        <img class="testimonial__card-img" src="${icon}" alt="" />
        <div class="testimonial__card-desc">
          <div class="testimonial__card-title">${name}</div>
          <div class="testimonial__card-subtitle">
            <div class="testimonial__card-place">'${place}'</div>
            <div class="testimonial__card-date">'${date}'</div>
          </div>
        </div>
      </div>
      <p class="testimonial__card-text">
        ${text} ${text}
      </p>
    </div>
    `;
  // </div>
  const element = document.createElement('div');

  const card = document.createElement('div');

  element.classList.add('testimonial__card', 'border-gradient');
  card.innerHTML = inner;

  element.innerHTML = inner;
  console.log(element);
  element.addEventListener('click', () => {
    // alert('');
    popupContent.innerHTML = inner;
    callback();
    modalElement.classList.add('modal--active');
    popupElement.classList.add('modal__child--active');
  });
  return element;
}
