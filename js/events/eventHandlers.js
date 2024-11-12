import { validateFullName, validateUsername, validatePassword, validateNewVote, validateNewVoteOption } from "../functions/validate.js";
import { generateValidateErrorList } from "../functions/validateErrorList.js";
import { notification } from "../functions/notification.js";
import { checkUserRoleFromLocalStorage, writeLocalStorageUserInfo } from "../functions/readLocalStorage.js";
import { loginUser, regNewUser, postNewVote, deleteVote, getVote, votingVote } from "../functions/apiRequests.js";
import { login, logout } from "../functions/logInAndLogOut.js";
import * as htmlElements from "../htmlElements/htmlElements.js";
import { addNewVoteCardsToMap, removeVoteFromMap, updateVoteCounts } from "../functions/votesMap.js";
import { generateVoteForm } from "../functions/generators.js";
import { errorHandler } from "../functions/errorHandler.js";
import { Info } from "../classes/Info.js";

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
    loginUser(user)
        .then(response => {
            if (response.token !== undefined) {
                writeLocalStorageUserInfo({ token: response.token });
                login();
            }
            else {
                throw new Error('No token in response');
            }

        })
        .catch(error => console.log(error));

    bootstrap.Modal.getOrCreateInstance(htmlElements.logonModal).hide();
};

const logoutEventHandler = () => {
    logout();
};

// Event handler for the vote button
const voteEventHandler = (event) => {
    const decodedToken = checkUserRoleFromLocalStorage(['user', 'admin']);

    if (decodedToken !== undefined) {
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
                .then(response => {
                    updateVoteCounts(response)
                        .then(message => {
                            notification({ name: 'info', message });
                        })
                        .catch(error => console.log("error :", error));
                });
        }
        else {
            notification({ name: 'error', message: 'Please select option first' });
        }
        bootstrap.Modal.getOrCreateInstance(htmlElements.viewVoteModal).hide();
    }
};

// Event handler for the vote card clicks
const openViewVoteModalEventHandler = (voteId) => {
    const decodedToken = checkUserRoleFromLocalStorage(['user', 'admin']);

    if (decodedToken !== undefined) {
        getVote(voteId)
            .then(response => {
                if (response !== undefined) {
                    if (checkUserRoleFromLocalStorage(['admin'], true)) {
                        htmlElements.viewVoteModalFooter.appendChild(htmlElements.voteDeleteBtn);
                    }
                    else {
                        htmlElements.voteDeleteBtn.remove();
                    }
                    const inputs = generateVoteForm(response.options, voteId);
                    htmlElements.viewVoteModalBody.innerHTML = inputs;
                    bootstrap.Modal.getOrCreateInstance(htmlElements.viewVoteModal).show();
                    return response;
                }
            })
            .catch(error => {
                notification(error);
            });
    }
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

// Event handler for add new vote button
const addNewVoteEventHandler = (event) => {
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
            if (response.message) {
                notification({ name: 'info', message: response.message });
            }
            if (response.savedVote) {
                addNewVoteCardsToMap([response.savedVote]);
            }
        })
        .catch(error => console.log("postNewData error: ", error));
    bootstrap.Modal.getOrCreateInstance(htmlElements.addVoteModal).hide();
};

// Event handler for the delete vote button
const deleteVoteEventHandler = (event) => {
    const form = event.target.parentElement.previousElementSibling.querySelector('form');
    const voteId = form.id.split('Vote')[1];
    deleteVote(voteId)
        .then(response => {
            console.log(response);
            if (response.ok) {
                const result = removeVoteFromMap(voteId);
                if (result) {
                    document.getElementById(`vote${voteId}Card`).remove();
                    throw new Info('Vote deleted successfully!');
                }
                else {
                    throw new Error('There is problem to delete this vote!');
                }
            }
        })
        .catch(error => {
            bootstrap.Modal.getOrCreateInstance(htmlElements.viewVoteModal).hide();
            errorHandler(error);
        });
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