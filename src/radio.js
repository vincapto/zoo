import { radioValue } from './sliderData';

import { createRadioButton } from './sliderCard';

const radioArray = radioValue.map((a, key) => {
  return createRadioButton({ a, key });
});

alert('asd');
