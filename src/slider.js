import { animalsData, testimonialsData, sliderQueryState } from './sliderData';
import { createAnimalCard, createTestimonialCard } from './sliderCard';
console.log(testimonialsData);
console.log(createTestimonialCard);

const leftAnimalsBtn = document.querySelector('.animals__left');
const rightAnimalsBtn = document.querySelector('.animals__right');
const animalsList = document.querySelector('.animals__list');
const testimonialList = document.querySelector('.testimonial__list');
const testimonialRange = document.querySelector('.testimonial__input-range');
const testimonialArray = testimonialsData.map((a) =>
  createTestimonialCard({ ...a, callback: stopAutoSlider })
);

console.log(testimonialArray);

let currentAnimalsState = { state: sliderQueryState.bigDesktop, page: 0 };
const testimonialSlides = 8;
console.log(testimonialSlides);

function getTestimonialPages() {
  const value =
    currentAnimalsState.state.testimonialCount + testimonialSlides - 1;
  // testimonialRange.max = value;
  return value;
}

function getTestimonialOrder(count) {
  const res = new Array(count).fill(0).reduce((a, b, key) => {
    console.log(a, b, key);
    a.push(key);
    return [...a];
  }, []);
  console.log('ARRAY ORDER', res);
  return res;
}
getTestimonialPages();

function getCurrentSize(key) {
  switch (true) {
    case key > 1001 && currentAnimalsState.state.width !== 1600:
      console.log('BIG DESKTOP');
      currentAnimalsState.state = sliderQueryState.bigDesktop;
      clearAutoStart();
      setAnimalCard(loadAnimalCard(getAnimalsPerPage()));
      setTestimonialCard();
      break;
    case key <= 1000 && key > 640 && currentAnimalsState.state.width !== 1000:
      console.log('Small DESKTOP');
      currentAnimalsState.state = sliderQueryState.smallDesktop;
      clearAutoStart();
      setAnimalCard(loadAnimalCard(getAnimalsPerPage()));
      setTestimonialCard();
      break;
    case key <= 640 && key > 320 && currentAnimalsState.state.width !== 640:
      console.log('TABLEY');
      currentAnimalsState.state = sliderQueryState.tablet;
      clearAutoStart();
      startAutoSlider();
      setAnimalCard(loadAnimalCard(getAnimalsPerPage()));
      setTestimonialCard();
      break;
    case key <= 320 && currentAnimalsState.state.width !== 320:
      currentAnimalsState.state = sliderQueryState.mobile;
      currentAnimalsState.page = 0;
      console.log('MOBILE');
      clearAutoStart();
      startAutoSlider();
      setAnimalCard(loadAnimalCard(getAnimalsPerPage()));
      setTestimonialCard();
      break;

    default:
      break;
  }
}
window.addEventListener('resize', () => {
  getAnimalsPerPage();
});

function loadAnimalCard(order) {
  const renderList = order.map((o) => {
    return createAnimalCard(animalsData[o]);
  });
  return renderList;
}
function loadTestimonialCard(order) {
  const renderList = order.map((o) => {
    return testimonialArray[o];
    // return createTestimonialCard(testimonialsData[o]);
  });
  return renderList;
}

function setAnimalCard(list) {
  animalsList.innerHTML = checkNumberPerPage(list).join('');
}

function setTestimonialCard() {
  const arr = loadTestimonialCard(getTestimonialPerPage());
  // testimonialList.innerHTML = arr.join('');
  testimonialList.innerHTML = '';
  testimonialList.append(...arr);
  console.log('ARR', arr);
}
setTestimonialCard();

function getAnimalsPerPage() {
  getCurrentSize(window.innerWidth);
  const start = currentAnimalsState.state.count * currentAnimalsState.page;
  const spliceArr = [...currentAnimalsState.state.order].splice(
    start != 0 ? start : 0,
    currentAnimalsState.state.count
  );
  return spliceArr;
}

function getTestimonialPerPage() {
  getCurrentSize(window.innerWidth);
  const start = currentAnimalsState.page;
  const arr = getTestimonialOrder(getTestimonialPages());
  const spliceArr = arr.splice(
    start != 0 ? start : 0,
    currentAnimalsState.state.testimonialCount
  );
  console.log(arr);
  return spliceArr;
}

function getRandomCardOrder(
  max = animalsData.length,
  length = currentAnimalsState.state.count
) {
  let flag = true;
  const arr = [];
  let buff = 0;
  const min = 0;

  while (flag) {
    buff = Math.floor(Math.random() * (max - min) + min);
    if (!arr.includes(buff)) {
      arr.push(buff);
    }
    if (arr.length === length) {
      flag = false;
    }
  }
  return arr;
}

function animateSlideList(
  hide = 'slide-left-hide',
  show = 'slide-left-show',
  callback,
  list = animalsList
) {
  list.classList.add(hide);
  list.onanimationend = () => {
    list.classList.remove(hide);
    callback();
    list.classList.add(show);
    list.onanimationend = () => {
      list.classList.remove(show);
    };
  };
}

function checkNumberPerPage(loadArray = []) {
  return loadArray.length === currentAnimalsState.state.count
    ? loadArray
    : loadAnimalCard(getRandomCardOrder());
}
let testimonialInterval = '';
let testimonialTimeout = '';

// startAutoSlider(1000);

function checkTestimonialSize() {
  return currentAnimalsState.page < testimonialSlides - 1
    ? currentAnimalsState.page + 1
    : 0;
}

function startAutoSlider(length = 1000, delay = 0) {
  testimonialInterval = setInterval(() => {
    currentAnimalsState.page = checkTestimonialSize();
    testimonialRange.value = currentAnimalsState.page;
    animateSlideList(
      'slide-right-hide',
      'slide-right-show',
      setTestimonialCard,
      testimonialList
    );
  }, length);
}

function stopAutoSlider() {
  clearInterval(testimonialInterval);
  testimonialTimeout = setTimeout(() => {
    clearTimeout(testimonialTimeout);
    startAutoSlider(1000);
    // alert(testimonialTimeout);
  }, 2000);
}

// export function clearTestimonialInterval(params) {}
export function restartTestimonialTimeout() {
  clearInterval(testimonialInterval);
  clearTimeout(testimonialTimeout);
  startAutoSlider(1000);
}

function clearAutoStart() {
  clearInterval(testimonialInterval);
  clearTimeout(testimonialTimeout);
}

testimonialRange.addEventListener('input', (event) => {
  console.log(event.target);
  currentAnimalsState.page = event.target.value;
  // setTestimonialCard();
  animateSlideList(
    'slide-right-hide',
    'slide-right-show',
    setTestimonialCard,
    testimonialList
  );
  console.log(currentAnimalsState.page);
});

leftAnimalsBtn.addEventListener('click', () => {
  const callback = () => {
    setAnimalCard(loadAnimalCard(getRandomCardOrder()));
  };
  animateSlideList('slide-left-hide', 'slide-left-show', callback);
});

rightAnimalsBtn.addEventListener('click', () => {
  const callback = () => {
    setAnimalCard(loadAnimalCard(getRandomCardOrder()));
  };
  animateSlideList('slide-right-hide', 'slide-right-show', callback);
});

setAnimalCard(loadAnimalCard(getRandomCardOrder()));
