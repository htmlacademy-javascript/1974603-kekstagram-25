const scaleSmaller=document.querySelector('.scale__control--smaller');//кнопка уменьшения
const scaleBigger=document.querySelector('.scale__control--bigger');//кнопка увеличения
const scaleValue=document.querySelector('.scale__control--value'); //значение поля масштаба
const picturePreview=document.querySelector('.img-upload__preview');
const effectsRadio=document.querySelectorAll('.effects__radio'); // кнопка с эффектом
const sliderElement=document.querySelector('.effect-level__slider'); // слайдер изменяющий насыщенность
const effectLevelValue=document.querySelector('.effect-level__value'); // записывается уровень жффекта
const SCALE_STEP=25;


const scalePlus=()=>{
  console.log('scaleValue: ', scaleValue.value);
  const valueNew=scaleValue.value.replace('%','');
  const valueNumb=Number(valueNew)+SCALE_STEP;
  if (valueNumb>=0 && valueNumb<=100){
    scaleValue.value=`${String(valueNumb) }%`;
    picturePreview.style.transform= `scale(${valueNumb/100})`;
  }
};
const scaleMinus=()=>{
  console.log('scaleValue: ', scaleValue.value);
  const valueSc=scaleValue.value.replace('%','');
  const valueNumber=Number(valueSc)-SCALE_STEP;
  if (valueNumber>=0 && valueNumber<=100){
    scaleValue.value=`${String(valueNumber) }%`;
    picturePreview.style.transform= `scale(${valueNumber/100})`;
  }
};
function initScale(){
  //событие нажатие кнопки уменьшения
  scaleSmaller.addEventListener('click', () => {
    scaleMinus();
  });

  //событие нажатие кнопки увеличения
  scaleBigger.addEventListener('click', () => {
    scalePlus();
  });
}


const effectNames = {
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
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    },
  },
  phobos: {
    filterName: 'blur',
    unit: '',
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
  //значение эффекта по умолчанию
picturePreview.class = 'effect__preview effect__preview—none';
//проверка есть ли слайдер
function turnEffectLevel (effectName) {
  const {options, filterName, unit} = effectNames[effectName];
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.off();
    sliderElement.noUiSlider.updateOptions(options);
  } else {
    noUiSlider.create(sliderElement, options);
  }
  if (effectName==='none'){
    sliderElement.noUiSlider.off();
  }
  console.log(options, filterName, unit);
  // применение эффекта к изображению
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    const value = unencoded[handle];
    effectLevelValue.value = value;
    picturePreview.style.filter = `${filterName}(${value}${unit})`;
    console.log(picturePreview.style.filter);
  });

}
function addingFilters(effectRadio){
  picturePreview.class = `effect__preview effect_preview—${effectRadio.value}`;
  console.log(picturePreview.class);
}
function initFilters(){
//нажатие на кнопку смены эффекта
  for (const element of effectsRadio) {
    element.addEventListener('change', (evt) => {
      addingFilters(evt.target);
      turnEffectLevel (evt.target.value);
    });
  }
}

export {initScale,initFilters};