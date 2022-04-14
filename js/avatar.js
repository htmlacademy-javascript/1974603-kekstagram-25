
const picturePreview=document.querySelector('.img-upload__input');//поле ввода, с помощью которого пользователь выбирает изображение
const preview = document.querySelector('.setup-user-pic');//картинка, куда будет вставляться превью загруженного изображения
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const chooseAvatar=()=>{
  picturePreview.addEventListener('change', () => {
    const file = picturePreview.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      preview.src = URL.createObjectURL(file);
    }
  });
};
export{chooseAvatar};
