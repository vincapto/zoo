export {};
import './styles/index.scss';
import './slider';

const menu = document.querySelector('.menu__list');
const hamburgerElement = document.querySelector('.hamburger');
const hamburgerBtn = document.querySelector('.hamburger__button');
const logo = document.querySelector('.logo-bar');
hamburgerElement.addEventListener('click', (e) => {
  hamburgerBtn.classList.toggle('hamburger__button--close');
  menu.classList.toggle('menu__list--active');
});

// let oldValue = '';
// const amount = document.querySelector('.input-amount');
// amount.addEventListener('input', (e) => {
//   e.preventDefault();
//   // @ts-ignore
//   const value = e.target.value;
//   // @ts-ignore
//   if (value.length <= 4) {
//     // @ts-ignore
//     oldValue = value;
//     // @ts-ignore
//     e.target.value = value;
//   } else {
//     // @ts-ignore
//     e.target.value = oldValue;
//   }
// });
// @import '../variables';
// .testimonial {
//   &__content {
//     padding-top: 140px;
//     padding-bottom: 182px;
//     @include respond(tablet) {
//       // max-height: 332px;
//       padding-top: 63px;
//       padding-bottom: 20px;
//     }
//   }
//   &__title {
//     @extend %h3Regular;
//     text-align: center;
//   }
//   &__list {
//     padding-top: 48px;
//     display: grid;
//     justify-items: center;
//     gap: 30px;
//     grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//     margin-bottom: 26px;
//     @include respond(tablet) {
//       padding-top: 30px;
//       grid-template-columns: 1fr;
//     }
//     @include respond(mobile) {
//       grid-template-columns: 1fr;
//     }
//   }
//   &__slider-scroll-active {
//     position: relative;
//     z-index: 2;
//     // margin: 0.4px 0.8px;
//     width: 115px;
//     border-radius: 6px;
//     height: 6px;
//     align-self: center;
//     background: $colorOrange;
//   }
//   &__slider-scroll-background {
//     position: absolute;
//     background: $colorGrayLight;
//     width: 100%;
//     height: 10px;
//     top: 0;
//   }
//   &__btn {
//     margin-top: 30px;
//   }
//   &__slider-scroll {
//     position: relative;
//     display: flex;
//     overflow: hidden;
//     width: 52%;
//     margin: 0 auto;
//     height: 8px;
//     border-width: 0.5px;
//     background-image: $linearPinkGrad;
//     border-radius: 5px;
//   }
//   .border-gradient {
//     background-image: $linearPinkGrad;
//     border-style: solid;
//     border-color: transparent;
//     background-origin: border-box;
//     background-clip: padding-box, border-box;
//   }
//   &__card {
//     display: flex;
//     // background-color: $colorGrayLight;
//     flex-direction: column;
//     // border: 2px solid $colorRed;
//     // background-image: $linearPinkGrad;
//     border-width: 2px;
//     border-style: solid;
//     border-radius: 20px;
//     overflow: hidden;
//     // padding: 15px;

//     &-background {
//       // position: absolute;
//       padding: 15px;
//       border-radius: 0;
//       // z-index: 2;
//       background-color: $colorGrayLight;
//       // padding-bottom: 100%;
//       @include respond(tablet) {

//       }
//     }
//     &--active {
//       filter: $cardShadow;
//     }
//     &-head {
//       display: flex;
//       margin-bottom: 11px;
//     }
//     &-desc {
//       padding-left: 10px;
//     }
//     &-img {
//       max-width: 37px;
//       max-height: 37px;
//     }
//     &-title {
//       @include font-source-sans('Roboto', 16px, $colorBlack, 300, 120%);
//       text-align: left;
//     }
//     &-subtitle {
//       @include font-source-sans('Roboto', 15px, $colorGray4, 300, 120%);
//       display: flex;
//     }
//     &-subtitle :first-child {
//       &::after {
//         content: '•';
//         padding: 0 8px;
//       }
//     }
//     &-text {
//       @include font-source-sans('Roboto', 15px, $colorBlackGray, 300, 18px);
//       text-align: left;
//       @include respond(tablet) {
//         // padding-top: 30px;
//         grid-template-columns: 1fr;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         display: -moz-box;
//         -moz-box-orient: vertical;
//         display: -webkit-box;
//         -webkit-line-clamp: 2;
//         -webkit-box-orient: vertical;
//         line-clamp: 2;
//         box-orient: vertical;
//       }
//     }
//   }
// }
