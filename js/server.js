import {showAlert} from './random.js';
const getData=(onSuccess)=>{
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(()=>{
      showAlert('Ошибка соединения');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};

