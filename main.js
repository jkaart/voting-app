import { fullNameEventHandler, usernameEventHandler, passwordEventHandler, regSubmitEventHandler, loginEventHandler, logoutEventHandler, voteEventHandler, deleteVoteEventHandler } from "./js/events/eventHandlers.js";
import { regFullName, regUser, regPassword1, regPassword2, regReturnBtn, regSubmitBtn, loginSubmitBtn, logoutBtn, voteSubmitBtn, voteDeleteBtn } from "./js/htmlElements/htmlElements.js";
import { notification } from "./js/functions/notification.js";
import { comparePasswords } from "./js/functions/validate.js";
import { generateVoteCardMap } from "./js/functions/votesMap.js";
import { votesData } from "./js/data/votes.js";
import { readUserStatus } from "./js/functions/readUserStatus.js";

// Clear localStorage
localStorage.removeItem('VotingApp');

const votes = generateVoteCardMap(votesData);
console.log(votes)

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
    regPassword2.value = '';
    if (result) {
        regPassword2.removeAttribute('disabled');
    }
    else {
        regSubmitBtn.setAttribute('disabled', '');
        regPassword2.setAttribute('disabled', '');
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

regSubmitBtn.addEventListener('click', (event) => {
    regSubmitEventHandler(event);
});

loginSubmitBtn.addEventListener('click', (event) => {
    loginEventHandler(event);
});

voteDeleteBtn.addEventListener('click', (event) => { deleteVoteEventHandler(event, votes) });

logoutBtn.addEventListener('click', logoutEventHandler);

voteSubmitBtn.addEventListener('click', (event) => {
    try {
        if (!readUserStatus()) throw { name: 'Info', message: 'You need log in' };
        voteEventHandler(event, votes);

    }
    catch ({ name, message }) {
        notification({ name, msg: message });
    }
});
