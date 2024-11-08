'use strict';

import { fullNameEventHandler, usernameEventHandler, passwordEventHandler, regSubmitEventHandler, loginEventHandler, logoutEventHandler, newVoteEventHandler, voteEventHandler, addNewVoteEventHandler, deleteVoteEventHandler } from "./js/events/eventHandlers.js";
import * as htmlElements from "./js/htmlElements/htmlElements.js";
import { VoteCard } from "./js/classes/VoteCard.js";
import { notification } from "./js/functions/notification.js";
import { comparePasswords } from "./js/functions/validate.js";
import { generateVoteCardMap } from "./js/functions/votesMap.js";
import { generateNewVoteOptionField } from "./js/functions/generators.js";
import { getAllVotes } from "./js/functions/apiRequests.js";
import { readLocalStorage } from "./js/functions/readLocalStorage.js";
import { login, logout } from "./js/functions/logInAndLogOut.js";

let votesArray = [];
const votesMap = new Map();

const syncInterval = null;
const timestamp = Date.now();

const initialLocalStorageCheck = () => {
    // Todo: need fix
    if (readLocalStorage('TTL') < timestamp) {
        logout();
    }
    else {
        const name = readLocalStorage('name');
        const role = readLocalStorage('role');
        login({ role, name });
    }
};
//initialLocalStorageCheck();

const syncAll = () => {
    getAllVotes();
};

getAllVotes()
    .then(response => {
        if (response) {
            console.log(response);
            votesArray = response;
            generateVoteCardMap(votesArray, votesMap);
            htmlElements.mainContentDiv.innerHTML = '';
            htmlElements.mainContentDiv.appendChild(htmlElements.voteContainer);
            if (!syncInterval) {
                //syncInterval = setInterval(syncAll, 10000);
            }
        }
        else {
            htmlElements.mainContentDiv.innerHTML = '<div class="d-flex align-items-center justify-content-center vh-100"><h1 class="text-center">No votes available!</h1></div>';
            if (syncInterval) {
                clearInterval(syncInterval);
            }
        }
    })
    .catch(error => {
        notification({ name: 'error', message:error.statusText });
    });

htmlElements.regFullName.addEventListener('input', (event) => {
    const result = fullNameEventHandler(event);
    if (result) {
        htmlElements.regUser.removeAttribute('disabled');
    }
    else {
        htmlElements.regUser.setAttribute('disabled', '');
    }
    htmlElements.regSubmitBtn.setAttribute('disabled', '');
});

htmlElements.regUser.addEventListener('input', (event) => {
    const result = usernameEventHandler(event);
    if (result) {
        htmlElements.regPassword1.removeAttribute('disabled');
    }
    else {
        htmlElements.regPassword1.setAttribute('disabled', '');
    }

});

htmlElements.regPassword1.addEventListener('input', (event) => {
    htmlElements.regUser.setAttribute('disabled', '');
    htmlElements.regFullName.setAttribute('disabled', '');
    const result = passwordEventHandler(event);
    htmlElements.regPassword2.value = '';
    if (result) {
        htmlElements.regPassword2.removeAttribute('disabled');
    }
    else {
        htmlElements.regSubmitBtn.setAttribute('disabled', '');
        htmlElements.regPassword2.setAttribute('disabled', '');
    }
    if (event.target.value.length === 0) {
        htmlElements.regUser.removeAttribute('disabled');
        htmlElements.regFullName.removeAttribute('disabled');
    }
});

htmlElements.regPassword2.addEventListener('input', (event) => {
    const result = comparePasswords(htmlElements.regPassword1.value, event.target.value);
    let span = event.target.nextElementSibling;
    if (span === null) {
        span = document.createElement('span');
    }
    span.classList.add('text-danger');
    span.textContent = result.msg;
    event.target.after(span);

    if (result.match) {
        htmlElements.regSubmitBtn.removeAttribute('disabled');
        event.target.classList.remove('is-invalid');
        event.target.classList.add('is-valid');
    }
    else {
        htmlElements.regSubmitBtn.setAttribute('disabled', '');
        event.target.classList.remove('is-valid');
        event.target.classList.add('is-invalid');
        //span.remove();
    }
});

htmlElements.regReturnBtn.addEventListener('click', () => {
    htmlElements.regFormModalBody.classList.remove('d-none');
    htmlElements.regFormModalFooter.classList.remove('d-none');

    htmlElements.regInfoModalBody.classList.add('d-none');
    htmlElements.regInfoModalFooter.classList.add('d-none');
    htmlElements.regForm.reset();
});

htmlElements.regSubmitBtn.addEventListener('click', (event) => {
    regSubmitEventHandler(event);
});

htmlElements.loginSubmitBtn.addEventListener('click', (event) => {
    loginEventHandler(event);
});

htmlElements.voteDeleteBtn.addEventListener('click', (event) => { deleteVoteEventHandler(event, votesArray); });

htmlElements.newVoteTitle.addEventListener('input', (event) => {
    const result = newVoteEventHandler(event);
    if (result) {
        for (const field of htmlElements.newVoteOptionsDiv.childNodes) {
            field.children[1].removeAttribute('disabled');
        }
        htmlElements.newVoteAddOptionBtn.removeAttribute('disabled');
    }
    else {
        htmlElements.addNewVoteSubmitBtn.setAttribute('disabled', '');
        for (const field of htmlElements.newVoteOptionsDiv.childNodes) {
            field.children[1].setAttribute('disabled', '');
        }
        htmlElements.newVoteAddOptionBtn.setAttribute('disabled', '');
    }
});

htmlElements.newVoteAddOptionBtn.addEventListener('click', () => {
    htmlElements.addNewVoteSubmitBtn.setAttribute('disabled', '');
    const newField = generateNewVoteOptionField(htmlElements.newVoteOptionsDiv.childElementCount + 1);
    htmlElements.newVoteOptionsDiv.appendChild(newField);
});

htmlElements.addNewVoteSubmitBtn.addEventListener('click', (event) => addNewVoteEventHandler(event, votesArray));

htmlElements.logoutBtn.addEventListener('click', logoutEventHandler);

htmlElements.voteSubmitBtn.addEventListener('click', (event) => { voteEventHandler(event); });

htmlElements.addVoteModal.addEventListener('hide.bs.modal', () => {
    htmlElements.newVoteForm.reset();
    const inputs = htmlElements.newVoteForm.getElementsByTagName('input');
    for (const [index, input] of Object.entries(inputs)) {
        input.classList.remove('is-valid', 'is-invalid');
        if (index === 0) {
            input.removeAttribute('disabled');
        }
        else {
            input.setAttribute('disabled', '');
        }
    }
});

htmlElements.addVoteModal.addEventListener('show.bs.modal', () => {
    htmlElements.newVoteOptionsDiv.innerHTML = '';
    for (let index = 1; index < 3; index++) {
        const optionField = generateNewVoteOptionField(index);
        optionField.children[1].setAttribute('disabled', '');
        htmlElements.newVoteOptionsDiv.appendChild(optionField);
    }
    htmlElements.newVoteAddOptionBtn.setAttribute('disabled', '');
    htmlElements.addNewVoteSubmitBtn.setAttribute('disabled', '');
});