const SCALE_STEP=25;
const scaleSmaller=document.querySelector('.scale__control--smaller');
const scaleBigger=document.querySelector('.scale__control--bigger');
const scaleValue=document.querySelector('.scale__control--value');
const picturePreview=document.querySelector('.img-upload__preview');
const fullPhoto=picturePreview.querySelector('img');
const effectsRadio=document.querySelectorAll('.effects__radio');
const sliderElement=document.querySelector('.effect-level__slider');
const effectLevelValue=document.querySelector('.effect-level__value');
const imgUpload=document.querySelector('.img-upload__effect-level');

imgUpload.classList.add('hidden');
const getScalePlus = () => {
  const valueNew=scaleValue.value.replace('%','');
  const valueNumb=Number(valueNew)+SCALE_STEP;
  if (valueNumb > 0 && valueNumb <= 100){
    scaleValue.value=`${String(valueNumb)}%`;
    fullPhoto.style.transform= `scale(${valueNumb/100})`;
  }
};
const getScaleMinus = () => {
  const valueSc=scaleValue.value.replace('%','');
  const valueNumber=Number(valueSc)-SCALE_STEP;
  if (valueNumber > 0 && valueNumber <= 100){
    scaleValue.value=`${String(valueNumber)}%`;
    fullPhoto.style.transform= `scale(${valueNumber/100})`;
  }
};
const getInitScale = () => {
  scaleSmaller.addEventListener('click', () => {
    getScaleMinus();
  });
  scaleBigger.addEventListener('click', () => {
    getScalePlus();
  });
};

const EffectNames = {
  none: {
    filterName: 'none',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 0,
      },
      start: 0,
      step: 0,
      connect: 'lower',
    },
  },
  chrome: {
    filterName: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  sepia: {
    filterName: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  marvin: {
    filterName: 'invert',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 100/100,
      },
      start: 100/100,
      step: 1/100,
      connect: 'lower',
    },
  },
  phobos: {
    filterName: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  },
  heat: {
    filterName: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  }
};

const getTurnEffectLevel = (effectName) => {
  const {options, filterName, unit} = EffectNames[effectName];
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
  if (effectName === 'none') {
    picturePreview.class = 'effect__preview effect__preview--none';
    picturePreview.style.filter = '';
    imgUpload.classList.add('hidden');
    return;
  }
  noUiSlider.create(sliderElement, options);
  imgUpload.classList.remove('hidden');
  imgUpload.classList.add('img-upload__effect-level');
  picturePreview.class = `effect__preview effect__preview--${effectName}`;
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    const value = unencoded[handle];
    effectLevelValue.value = value;
    picturePreview.style.filter = `${filterName}(${value}${unit})`;
  });
};

const getInitFilters = () => {
  for (const element of effectsRadio) {
    element.addEventListener('change', (evt) => {
      getTurnEffectLevel (evt.target.value);
    });
  }
};

export {getInitScale, getInitFilters, getTurnEffectLevel};
