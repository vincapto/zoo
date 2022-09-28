const animalsData = [
  {
    img: `../images/panda-card.png`,
    cardName: 'giant Pandas',
    cardText: 'Native to Southwest China',
    cardIcon: `../images/grass-eating.png`,
  },
  {
    img: `../images/eagle-card.png`,
    cardName: 'Eagles',
    cardText: 'Native to South America',
    cardIcon: `../images/meat-eating.png`,
  },
  {
    img: `../images/gorilla-card.png`,
    cardName: 'Gorillas',
    cardText: 'Native to Congo',
    cardIcon: `../images/grass-eating.png`,
  },
  {
    img: `../images/sloth-card.png`,
    cardName: 'Two-toed Sloth',
    cardText: 'Mesoamerica, South America',
    cardIcon: `../images/grass-eating.png`,
  },
  {
    img: `../images/cheetah-card.png`,
    cardName: 'cheetahs',
    cardText: ' Native to Africa',
    cardIcon: `../images/meat-eating.png`,
  },
  {
    img: `../images/penguin-card.png`,
    cardName: 'Penguins',
    cardText: 'Native to Antarctica',
    cardIcon: `../images/grass-eating.png`,
  },
  {
    img: `../images/alligator-card.png`,
    cardName: 'Alligators',
    cardText: 'Native to Southeastern U. S.',
    cardIcon: `../images/meat-eating.png`,
  },
];

const cardOrder = [
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 4, 2, 6, 5, 3],
  [0, 1, 2, 5, 4, 5, 3],
  [0, 1, 2, 5],
];

const sliderQueryState = {
  bigDesktop: {
    count: 6,
    order: cardOrder[0],
    width: 1600,
  },
  smallDesktop: {
    count: 6,
    order: cardOrder[1],
    width: 1000,
  },
  tablet: {
    count: 4,
    order: cardOrder[2],
    width: 640,
  },
  mobile: {
    count: 4,
    order: cardOrder[3],
    width: 320,
  },
};

let currentAnimalsState = { state: sliderQueryState.bigDesktop, page: 0 };

function getCurrentSize(key) {
  switch (true) {
    case key > 1001 && currentAnimalsState.state.width !== 1600:
      console.log('BIG DESKTOP');
      currentAnimalsState.state = sliderQueryState.bigDesktop;
      setAnimalCard(loadAnimalCard(getAnimalsPerPage()));
      break;
    case key <= 1000 && key > 640 && currentAnimalsState.state.width !== 1000:
      console.log('Small DESKTOP');
      currentAnimalsState.state = sliderQueryState.smallDesktop;
      setAnimalCard(loadAnimalCard(getAnimalsPerPage()));
      break;
    case key <= 640 && key > 320 && currentAnimalsState.state.width !== 640:
      console.log('TABLEY');
      currentAnimalsState.state = sliderQueryState.tablet;
      setAnimalCard(loadAnimalCard(getAnimalsPerPage()));
      break;
    case key <= 320 && currentAnimalsState.state.width !== 320:
      currentAnimalsState.state = sliderQueryState.mobile;
      currentAnimalsState.page = 0;
      console.log('MOBILE');
      setAnimalCard(loadAnimalCard(getAnimalsPerPage()));
      break;

    default:
      break;
  }
}

window.addEventListener('resize', () => {
  // const key = window.innerWidth;
  getAnimalsPerPage();
});

const leftAnimalsBtn = document.querySelector('.animals__left');
const rightAnimalsBtn = document.querySelector('.animals__right');
const animalsList = document.querySelector('.animals__list');

function createAnimalCard({
  cardName,
  cardText,
  img,
  cardIcon,
  className = '',
}) {
  return `
    <div class="animals__item card card-panda ${className}">
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
    </div>
  `;
}

function loadAnimalCard(order) {
  const renderList = order.map((o) => {
    return createAnimalCard(animalsData[o]);
  });
  return renderList;
}

function setAnimalCard(list) {
  // console.log('SET LIST', list);
  animalsList.innerHTML = checkNumberPerPage(list).join('');
}

function getAnimalsPerPage() {
  getCurrentSize(window.innerWidth);
  const start = currentAnimalsState.state.count * currentAnimalsState.page;
  const spliceArr = [...currentAnimalsState.state.order].splice(
    start != 0 ? start : 0,
    currentAnimalsState.state.count
  );
  return spliceArr;
}

setAnimalCard(loadAnimalCard(checkNumberPerPage(getAnimalsPerPage())));
// setAnimalCard(loadAnimalCard(cardOrder[0]));

function fillHidden(loadArray) {
  return [
    ...loadArray,
    new Array(currentAnimalsState.state.count - loadArray.length)
      .fill(createAnimalCard({ ...animalsData[0], className: 'card--hidden' }))
      .join(''),
  ];
}

leftAnimalsBtn.addEventListener('click', () => {
  currentAnimalsState.page =
    currentAnimalsState.page != 0
      ? (currentAnimalsState.page -= 1)
      : currentAnimalsState.page;
  let loadArray = loadAnimalCard(getAnimalsPerPage());
  loadArray =
    loadArray.length === currentAnimalsState.state.count
      ? loadArray
      : [
          ...loadArray,
          new Array(currentAnimalsState.state.count - loadArray.length).fill(
            createAnimalCard(animalsData[0])
          ),
        ];
  setAnimalCard(loadArray);
});

function checkNumberPerPage(loadArray) {
  return loadArray.length === currentAnimalsState.state.count
    ? loadArray
    : fillHidden(loadArray);
}

rightAnimalsBtn.addEventListener('click', () => {
  console.log(currentAnimalsState);
  const pageMax = Math.floor(
    animalsData.length / currentAnimalsState.state.count
  );
  console.table(currentAnimalsState.state);
  currentAnimalsState.page =
    currentAnimalsState.page != pageMax
      ? (currentAnimalsState.page += 1)
      : currentAnimalsState.page;
  let loadArray = loadAnimalCard(getAnimalsPerPage());
  loadArray =
    loadArray.length === currentAnimalsState.state.count
      ? loadArray
      : fillHidden(loadArray);
  console.log(loadArray);
  setAnimalCard(loadArray);
  // setAnimalCard(loadAnimalCard(getAnimalsPerPage()));
});
