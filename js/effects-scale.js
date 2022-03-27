const scaleSmaller=document.querySelector('.scale__control--smaller');//кнопка уменьшения
const scaleBigger=document.querySelector('.scale__control--bigger');//кнопка увеличения
const scaleValue=document.querySelector('.scale__control--value'); //значение поля масштаба
const picturePreview=document.querySelector('.img-upload__preview');
const effectsRadio=document.querySelector('.effects__radio'); // кнопка с эффектом
const sliderElement=document.querySelector('.effect-level__slider'); // слайдер изменяющий насыщенность
const effectLevelValue=document.querySelector('.effect-level__value'); // записывается уровень жффекта
//событие нажатие кнопки уменьшения
scaleSmaller.addEventListener('click', () => {
  scaleMinus();
});

//событие нажатие кнопки увеличения
scaleBigger.addEventListener('click', () => {
  scalePlus();
});


function scalePlus (){
  scaleValue.value+=scaleValue.value+25;
  picturePreview.style.transform =`scale(${scaleValue.value/100})`;
}
function scaleMinus (){
  scaleValue.value-=scaleValue.value-25;
  picturePreview.style.transform= `scale(${scaleValue.value/100})`;
}
//значение эффекта по умолчанию
picturePreview.class = 'effect__preview effect__preview—none';

const effectNames = {
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
      start: 50,
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
      start: 1,
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
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  }
};

//проверка есть ли слайдер
function turnEffectLevel (effectName) {
  const {options, filterName, unit} = effectNames[effectName];

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.off();
    sliderElement.noUiSlider.updateOptions(options);
  } else {
    noUiSlider.create(sliderElement, options);
  }
  // применение эффекта к изображению
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    const value = unencoded[handle];
    effectLevelValue.value = value;
    picturePreview.style.filter = `${filterName}(${value}${unit})`;
  });
}
function addingFilters(effectRadio){
  picturePreview.class = `effect__preview effect_preview—${effectRadio.value}`;
}
//нажатие на кнопку смены эффекта
effectsRadio.addEventListener('click', () => {
  addingFilters(effectsRadio.value);
  turnEffectLevel (effectNames);
});
/*
const nodeEffectClass=()=>{
  if(picturePreview.classList.contains('effects__preview--none')){
    picturePreview.classList.remove('effects__preview--none');
  }
};
//наложение эффекта Хром
function chromeEffect (){
  nodeEffectClass();
  picturePreview.class = 'effect__preview effect__preview—chrome';
}
//наложение эффекта Сепия
function sepiaEffect (){
  nodeEffectClass();
  picturePreview.class = 'effect__preview effect__preview—sepia';
}
//наложение эффекта Marvin
function marvinEffect (){
  nodeEffectClass();
  picturePreview.class = 'effect__preview effect__preview—marvin';
}
//наложение эффекта Phobos
function phobosEffect (){
  nodeEffectClass();
  picturePreview.class = 'effect__preview effect__preview—phobos';
}
//наложение эффекта Heat
function heatEffect () {
  nodeEffectClass();
  picturePreview.class = 'effect__preview effect__preview—heat';
}
из обработчика
if (effectsRadio.value==='grayscale'){
    chromeEffect();
  }
  if (effectsRadio.value==='sepia'){
    sepiaEffect();
  }
  if (effectsRadio.value==='invert'){
    marvinEffect();
  }
  if (effectsRadio.value==='blur'){
    phobosEffect();
  }
  if (effectsRadio.value==='brightness'){
    heatEffect();
  }
//слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
});

effectLevelValue.addEventListener('change', () => {
  if (effectLevelValue.value==='none'){
    sliderElement.noUiSlider.destroy();
    picturePreview.style.filter='';
  }
  else if (effectLevelValue.value==='grayscale') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      step: 0.1
    });
  }
  else if (effectLevelValue.value==='sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1
    });
  }
  else if (effectLevelValue.value==='invert') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1
    });
  }
  else if (effectLevelValue.value==='blur') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1
    });
  }
  else if (effectLevelValue.value==='brightness') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1
    });
  }
});*/


