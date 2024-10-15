import { fullNameEventHandler, usernameEventHandler, passwordEventHandler, regSubmitEventHandler, loginEventHandler, logoutEventHandler } from "./js/events/eventHandlers.js";
import { notification } from "./js/functions/notification.js";
import { comparePasswords } from "./js/functions/validate.js";

const regForm = document.getElementById('regForm');

const regFullName = document.getElementById('regFullName');
const regUser = document.getElementById('regUsername');
const regPassword1 = document.getElementById('regPassword1');
const regPassword2 = document.getElementById('regPassword2');
const regSubmitBtn = document.getElementById('regSubmit');
const regReturnBtn = document.getElementById('regInfoReturnBtn');

const logoutBtn = document.getElementById('logout');

const loginSubmitBtn = document.getElementById('loginSubmit');

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

regReturnBtn.addEventListener('click', () => {
    document.getElementById('regFormModalBody').classList.remove('d-none');
    document.getElementById('regFormModalFooter').classList.remove('d-none');

    document.getElementById('regInfoModalBody').classList.add('d-none');
    document.getElementById('regInfoModalFooter').classList.add('d-none');
    regForm.reset();
})

regSubmitBtn.addEventListener('click', regSubmitEventHandler);

loginSubmitBtn.addEventListener('click', loginEventHandler);
logoutBtn.addEventListener('click', logoutEventHandler);

notification({msg:'testi'})