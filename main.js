import { users } from "./js/data/users.js";
import {validateUsernameEventHandler, validatePasswordEventHandler, regFormEventHandler } from "./js/events/eventHandlers.js";
import { comparePasswords } from "./js/functions/validatePassword.js";

const showRegFormBtn = document.getElementById('showRegForm');

const regForm = document.getElementById('regForm');

const regUser = document.getElementById('regUsername');
const regPassword1 = document.getElementById('regPassword1');
const regPassword2 = document.getElementById('regPassword2');
const regSubmitBtn = document.getElementById('regSubmit');

const loginSubmitBtn = document.getElementById('loginSubmit');
const loginPassword = document.getElementById('loginPassword');
const loginUser = document.getElementById('loginUsername');

regUser.addEventListener('input', (event) => {
    const result = validateUsernameEventHandler(event)
    if (result) {
        regSubmitBtn.setAttribute('disabled', '');
        regPassword1.removeAttribute('disabled');
    }
    else {
        regPassword1.setAttribute('disabled', '');
    }
})

regPassword1.addEventListener('input', (event) => {
    regUser.setAttribute('disabled','')
    const result = validatePasswordEventHandler(event);
    const pw2Field = event.target.parentElement.nextElementSibling.getElementsByTagName('input')[0];
    pw2Field.value = '';
    if (result) {
        pw2Field.removeAttribute('disabled');
    }
    else {
        regSubmitBtn.setAttribute('disabled', '');
        pw2Field.setAttribute('disabled', '');
    }
    if (event.target.value.length === 0) {
        regUser.removeAttribute('disabled');
    }
});

regPassword2.addEventListener('input', (event) => {
    const result = comparePasswords(regPassword1.value, event.target.value);
    let span = event.target.nextElementSibling;
    if (span === null) {
        span = document.createElement('span');
    }
    span.textContent = result.msg;
    event.target.after(span);

    if (result.match) {
        regSubmitBtn.removeAttribute('disabled');
        event.target.classList.remove('is-invalid');
        event.target.classList.add('is-valid');
    }
    else {
        regSubmitBtn.setAttribute('disabled','');
        event.target.classList.remove('is-valid');
        event.target.classList.add('is-invalid');
        //span.remove();
    }
});

showRegFormBtn.addEventListener('click', () => {
    regPassword1.value = '';
    regPassword2.value = '';
});

regForm.addEventListener('submit', regFormEventHandler);

