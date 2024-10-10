import { validatePasswordEvent } from "./js/events/eventHandlers.js";
import { comparePasswords } from "./js/functions/validatePassword.js";

const showRegFormBtn = document.getElementById('showRegForm')
const regSubmitBtn = document.getElementById('registerSubmit');
const regPassword1 = document.getElementById('regPassword1');
const regPassword2 = document.getElementById('regPassword2');

regPassword1.addEventListener('input', (event) => {
    const result = validatePasswordEvent(event);
    result ? event.target.parentElement.nextElementSibling.classList.remove('invisible') : event.target.parentElement.nextElementSibling.classList.add('invisible')
});

regPassword2.addEventListener('input', (event) => {
    const result = comparePasswords(regPassword1.value, event.target.value);
    event.target.nextSibling.textContent = result.msg;
    result.match ? regSubmitBtn.removeAttribute('disabled') : regSubmitBtn.setAttribute('disabled', '');
});
showRegFormBtn.addEventListener('click', () => {
    regPassword1.value = '';
    regPassword2.value = '';
})