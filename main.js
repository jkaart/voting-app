import { fullNameEventHandler, usernameEventHandler, passwordEventHandler, regFormEventHandler, loginFormEventHandler, logoutEventHandler } from "./js/events/eventHandlers.js";
import { comparePasswords } from "./js/functions/validate.js";

const showRegFormBtn = document.getElementById('showRegForm');

const regForm = document.getElementById('regForm');

const regFullName = document.getElementById('regFullName');
const regUser = document.getElementById('regUsername');
const regPassword1 = document.getElementById('regPassword1');
const regPassword2 = document.getElementById('regPassword2');
const regSubmitBtn = document.getElementById('regSubmit');

const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logout');

const loginSubmitBtn = document.getElementById('loginSubmit');
const loginPassword = document.getElementById('loginPassword');
const loginUser = document.getElementById('loginUsername');

regFullName.addEventListener('input', (event) => {
    const result = fullNameEventHandler(event);
    if (result) {
        regUser.removeAttribute('disabled');
    }
    else {
        regUser.setAttribute('disabled', '');
    }
    regSubmitBtn.setAttribute('disabled', '');
});

regUser.addEventListener('input', (event) => {
    const result = usernameEventHandler(event)
    if (result) {
        regPassword1.removeAttribute('disabled');
    }
    else {
        regPassword1.setAttribute('disabled', '');
    }

});

regPassword1.addEventListener('input', (event) => {
    regUser.setAttribute('disabled', '');
    regFullName.setAttribute('disabled', '');
    const result = passwordEventHandler(event);
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
        regFullName.removeAttribute('disabled');
    }
});

regPassword2.addEventListener('input', (event) => {
    const result = comparePasswords(regPassword1.value, event.target.value);
    let span = event.target.nextElementSibling;
    if (span === null) {
        span = document.createElement('span');
    }
    span.classList.add('text-danger');
    span.textContent = result.msg;
    event.target.after(span);

    if (result.match) {
        regSubmitBtn.removeAttribute('disabled');
        event.target.classList.remove('is-invalid');
        event.target.classList.add('is-valid');
    }
    else {
        regSubmitBtn.setAttribute('disabled', '');
        event.target.classList.remove('is-valid');
        event.target.classList.add('is-invalid');
        //span.remove();
    }
});

regForm.addEventListener('submit', regFormEventHandler);

loginForm.addEventListener('submit', loginFormEventHandler);
logoutBtn.addEventListener('click', logoutEventHandler);