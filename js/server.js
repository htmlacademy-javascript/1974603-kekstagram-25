//import { showAlert } from './random.js';

const getData=(onSuccess,onError)=>{
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(()=>{
      onError('Ошибка соединения');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram ',
    {
      method: 'POST',
      body,
      'Content-Type': 'multipart/form-data'
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

