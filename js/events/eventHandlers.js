import { validateFullName, validateUsername, validatePassword, validateNewVote, validateNewVoteOption } from "../functions/validate.js";
import { generateValidateErrorList } from "../functions/validateErrorList.js";
import { notification } from "../functions/notification.js";
import { readLocalStorage, checkTokenFromLocalStorage } from "../functions/readLocalStorage.js";
import { loginUser, regNewUser, postNewVote, deleteVote, getVote, votingVote } from "../functions/apiRequests.js";
import { login, logout } from "../functions/logInAndLogOut.js";
import * as htmlElements from "../htmlElements/htmlElements.js";
import { generateVoteCardMap } from "../functions/votesMap.js";
import { generateVoteForm } from "../functions/generators.js";

const fullNameEventHandler = (event) => {
    const result = validateFullName(event.target.value);
    generateValidateErrorList(event, result);

    return result.valid;
};

const usernameEventHandler = (event) => {
    const result = validateUsername(event.target.value);
    generateValidateErrorList(event, result);

    return result.valid;
};

const passwordEventHandler = (event) => {
    const result = validatePassword(event.target.value);
    generateValidateErrorList(event, result);

    return result.valid;
};

const regSubmitEventHandler = (event) => {
    event.preventDefault();
    try {
        const userName = htmlElements.regUsername.value;
        const role = htmlElements.regForm.querySelector('input[name="regRoleRadio"]:checked').value;
        const pwHash = md5(htmlElements.regPassword1.value);
        const name = htmlElements.regFullName.value;
        const user = { username: userName, password: pwHash, role, name };
        const result = regNewUser(user);
        console.log(result);
        bootstrap.Modal.getOrCreateInstance(htmlElements.regModal).hide();
    }
    catch ({ name, message }) {
        notification({ message });
        console.log(`${name}:${message}`);
    }
    finally {
        htmlElements.regForm.reset();
        const inputs = htmlElements.regForm.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];
            element.classList.remove('is-valid');
            if (index === 0) {
                element.removeAttribute('disabled');
            }
            else if (index === 1 || index === 2) {
                continue;
            }
            else {
                element.setAttribute('disabled', '');
            }
        }
        htmlElements.regSubmitBtn.setAttribute('disabled', '');
    }
};

const loginEventHandler = (event) => {
    event.preventDefault();
    const userName = htmlElements.loginUsername.value;
    const pwHash = md5(htmlElements.loginPassword.value);

    const user = { username: userName, password: pwHash };
    const result = loginUser(user);
    result
        .then(
            (result) => { login(result); },
            (error) => { notification(error); },
        );
    bootstrap.Modal.getOrCreateInstance(htmlElements.logonModal).hide();
};

const logoutEventHandler = () => {
    logout();
    notification({ name: 'Info', message: 'You are logged out' });
};

const voteEventHandler = (event) => {
    // ToDO: need fix
    const form = event.target.parentElement.previousElementSibling.querySelector('form');
    const voteId = form.id.split('Vote')[1];
    const inputs = form.querySelectorAll('input');
    let voteOptionId = null;
    for (const input of inputs) {
        if (input.checked) {
            voteOptionId = input.id.split('vote')[1];
        }
    }
    voteOptionId = voteOptionId.split('Radios')[0];
    if (voteOptionId !== null) {
        votingVote(voteId, voteOptionId)
            .then((response) => { return response; })
            .then((result) => {

                notification({ result });
            });
    }
    else {
        notification({ name: 'error', message: 'Please select option first' });
    }
    bootstrap.Modal.getOrCreateInstance(htmlElements.viewVoteModal).hide();
};

const openViewVoteModalEventHandler = (voteId) => {

    const role = readLocalStorage('role');
    if (role === null) {
        notification({ error: 'You are not logged in' });
        return;
    }
    getVote(voteId)
        .then(response => {
            console.log(response);
            if (response.status === 401) {
                console.log(response);
                throw new Error(response.statusText);
            }
            if (role === 'admin') {
                htmlElements.viewVoteModalFooter.appendChild(htmlElements.voteDeleteBtn);
            }
            else {
                htmlElements.voteDeleteBtn.remove();
            }
            const inputs = generateVoteForm(response.options, voteId);
            htmlElements.viewVoteModalBody.innerHTML = inputs;
            bootstrap.Modal.getOrCreateInstance(htmlElements.viewVoteModal).show();
            return response;

        })
        .catch(error => {
            notification(error);
        });
};

const newVoteEventHandler = (event) => {
    const result = validateNewVote(event.target.value);
    generateValidateErrorList(event, result);
    return result.valid;
};

const newVoteOptionEventHandler = (event) => {
    const result = validateNewVoteOption(event.target.value);
    generateValidateErrorList(event, result);
    return result.valid;
};

const addNewVoteEventHandler = (event, votesArray) => {
    event.preventDefault();

    const title = htmlElements.newVoteTitle.value;
    const description = htmlElements.newVoteDescription.value;

    const inputs = htmlElements.newVoteForm.children[1].getElementsByTagName('input');
    const options = [];

    for (const input of inputs) {
        options.push(input.value);
    }

    const data = { title: title, description: description, options: options };
    postNewVote(data)
        .then(response => {
            console.log('postNewVote response: ', response);
            if (response.message) {
                notification({ name: 'info', message: response.message });
            }
            if (response.savedVote) {
                votesArray = generateVoteCardMap([response.savedVote], votesArray);
                htmlElements.mainContentDiv.innerHTML = '';
                htmlElements.mainContentDiv.appendChild(htmlElements.voteContainer);
            }
        })
        .catch(error => console.log("postNewData error: ", error));
        bootstrap.Modal.getOrCreateInstance(htmlElements.addVoteModal).hide();
};

const deleteVoteEventHandler = (event, votesMap) => {
    // ToDO: need fix
    
    const form = event.target.parentElement.previousElementSibling.querySelector('form');
    const voteId = form.id.split('Vote')[1];
    const response = deleteVote(voteId);


    if (response.status === 204) {
        // Remove the vote from DOM
        document.getElementById(`vote${voteId}CardContainer`).remove();
        bootstrap.Modal.getOrCreateInstance(htmlElements.viewVoteModal).hide();
        notification({ response });
    }
};

export {
    fullNameEventHandler,
    usernameEventHandler,
    passwordEventHandler,
    regSubmitEventHandler,
    loginEventHandler,
    logoutEventHandler,
    voteEventHandler,
    openViewVoteModalEventHandler,
    addNewVoteEventHandler,
    newVoteOptionEventHandler,
    newVoteEventHandler,
    deleteVoteEventHandler,
};