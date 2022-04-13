const downloadField=document.querySelector('.img-upload__start');
const randomButton=document.querySelector('#filter-random');
const discussedButton=document.querySelector('#filter-discussed');
const defaultButton=document.querySelector('#filter-default');
const ALERT_SHOW_TIME=5000;
const getRandomPositiveInteger = (minIndex, maxIndex) => {
  const lower = Math.ceil(Math.min(Math.abs(minIndex), Math.abs(maxIndex)));
  const upper = Math.floor(Math.max(Math.abs(minIndex), Math.abs(maxIndex)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const clearSelectionField = () => {
  downloadField.innerHTML = '';
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//const lengthString=(checkString, maxLength) => checkString <= maxLength;
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
const defaultButtonStyle=()=>{
  defaultButton.style.color='#ff4e4e';
  defaultButton.style.backgroundColor='#ffffff';
  defaultButton.style.borderRadius='2px';
};
const randomButtonStyle=()=>{
  randomButton.style.color='#ff4e4e';
  randomButton.style.backgroundColor='#ffffff';
  randomButton.style.borderRadius='2px';
};
const deleteStyleDefault=()=>{
  defaultButton.style.backgroundColor='#232321';
  defaultButton.style.color='#FFFFFF';
};
const discussButtonStyle=()=>{
  discussedButton.style.color='#ff4e4e';
  discussedButton.style.backgroundColor='#ffffff';
  discussedButton.style.borderRadius='2px';
};
const deleteStyleRandom=()=>{
  randomButton.style.backgroundColor='#232321';
  randomButton.style.color='#FFFFFF';
};
const deleteStyleDiscuss=()=>{
  discussedButton.style.backgroundColor='#232321';
  discussedButton.style.color='#FFFFFF';
};
export {getRandomPositiveInteger,getRandomArrayElement, isEscapeKey, clearSelectionField,showAlert, debounce,randomButtonStyle,deleteStyleRandom,deleteStyleDefault,discussButtonStyle,deleteStyleDiscuss,defaultButtonStyle};
