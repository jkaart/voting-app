import { fullNameEventHandler, usernameEventHandler, passwordEventHandler, regSubmitEventHandler, loginEventHandler, logoutEventHandler, newVoteEventHandler, voteEventHandler, addNewVoteEventHandler, newVoteOptionEventHandler, deleteVoteEventHandler } from "./js/events/eventHandlers.js";
import { regFullName, regUser, regPassword1, regPassword2, regReturnBtn, regSubmitBtn, loginSubmitBtn, logoutBtn, voteSubmitBtn, voteDeleteBtn, newVoteForm, addNewVoteSubmitBtn, newVoteTitle, newVoteAddOptionBtn, addVoteModal, newVoteOptionsDiv, mainContentDiv, voteContainer } from "./js/htmlElements/htmlElements.js";
import { notification } from "./js/functions/notification.js";
import { comparePasswords } from "./js/functions/validate.js";
import { generateVoteCardMap } from "./js/functions/votesMap.js";
import { votesData } from "./js/data/votes.js";
import { readLocalStorageLoginStatus, readLocalStorageUserRole } from "./js/functions/readLocalStorage.js";
import { generateNewVoteOptionField } from "./js/functions/generators.js";

// Clear localStorage
localStorage.removeItem('VotingApp');

const votes = generateVoteCardMap(votesData);
if (votes.length === 0) {
    mainContentDiv.innerHTML = '';
}
else {
    mainContentDiv.appendChild(voteContainer);
}

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

newVoteTitle.addEventListener('input', (event) => {
    const result = newVoteEventHandler(event);
    if (result) {
        for (const field of newVoteOptionsDiv.childNodes) {
            field.children[1].removeAttribute('disabled');
        }
        newVoteAddOptionBtn.removeAttribute('disabled');
    }
    else {
        addNewVoteSubmitBtn.setAttribute('disabled', '');
        for (const field of newVoteOptionsDiv.childNodes) {
            field.children[1].setAttribute('disabled', '');
        }
        newVoteAddOptionBtn.setAttribute('disabled', '');
    }
});

newVoteAddOptionBtn.addEventListener('click', (event) => {
    addNewVoteSubmitBtn.setAttribute('disabled', '');
    const newField = generateNewVoteOptionField(newVoteOptionsDiv.childElementCount + 1);
    newVoteOptionsDiv.appendChild(newField);
})

addNewVoteSubmitBtn.addEventListener('click', (event) => { addNewVoteEventHandler(event, votes) });

logoutBtn.addEventListener('click', logoutEventHandler);

voteSubmitBtn.addEventListener('click', (event) => {
    try {
        if (!readLocalStorageUserRole()) throw { name: 'Info', message: 'You need log in' };
        voteEventHandler(event, votes);
    }
    catch ({ name, message }) {
        notification({ name, msg: message });
    }
});

addVoteModal.addEventListener('hide.bs.modal', () => {
    newVoteForm.reset();
    const inputs = newVoteForm.getElementsByTagName('input');
    for (const [index, input] of Object.entries(inputs)) {
        input.classList.remove('is-valid', 'is-invalid');
        if (index == 0) {
            input.removeAttribute('disabled')
        }
        else {
            input.setAttribute('disabled', '');
        }
    }
})

addVoteModal.addEventListener('show.bs.modal', () => {
    newVoteOptionsDiv.innerHTML = '';
    for (let index = 1; index < 3; index++) {
        const optionField = generateNewVoteOptionField(index);
        optionField.children[1].setAttribute('disabled', '');
        newVoteOptionsDiv.appendChild(optionField);
    }
    newVoteAddOptionBtn.setAttribute('disabled', '');
    addNewVoteSubmitBtn.setAttribute('disabled', '');
})