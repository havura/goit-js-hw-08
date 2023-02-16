import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');
const refs = {
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

const handleFormInput = event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const handleFormSubmit = event => {
  event.preventDefault();
    
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
  formElement.reset();
};

const textareaData = () => {
  let savedMassage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  formData = savedMassage;
  refs.message.value = savedMassage.message || '';
  refs.email.value = savedMassage.email || '';
};

textareaData();

formElement.addEventListener('input', throttle(handleFormInput, 500));
formElement.addEventListener('submit', handleFormSubmit);
