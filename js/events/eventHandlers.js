import { validateFullName, validateUsername, validatePassword } from "../functions/validate.js";
import { generateValidateErrorList } from "../functions/validateErrorList.js";
import { User } from '../classes/User.js';
import { notification } from "../functions/notification.js";
import { generateVoteForm } from "../functions/generators.js";
import { readLocalStorageLoginStatus, readLocalStorageUserRole } from "../functions/readLocalStorage.js";
import { loadUsers } from "../functions/loadUsers.js";
import { usersData } from "../data/users.js";
import { viewVoteModal, regForm, regUsername, regPassword1, regFullName, regModal, regSubmitBtn, showAddVoteModalBtn, voteDeleteBtn } from "../htmlElements/htmlElements.js";

const users = loadUsers(usersData);

console.log(users);

const fullNameEventHandler = (event) => {
    const result = validateFullName(event.target.value);
    generateValidateErrorList(event, result);

    return result.valid
}

const usernameEventHandler = (event) => {
    const result = validateUsername(event.target.value);
    generateValidateErrorList(event, result);

    return result.valid
}

const passwordEventHandler = (event) => {
    const result = validatePassword(event.target.value);
    generateValidateErrorList(event, result);

    return result.valid
}

const regSubmitEventHandler = (event) => {
    event.preventDefault();
    const userName = regUsername.value;
    try {
        const result = users.find(({ username }) => username === userName);
        if (result) throw new Error(`${userName} is already registered!`);
        else {
            const role = regForm.querySelector('input[name="regRoleRadio"]:checked').value;
            const pwHash = md5(regPassword1.value);
            const name = regFullName.value;
            const userDataLength = usersData.length;
            const user = { userID: userDataLength, username: userName, pwHash, role, name };
            usersData.push(user);
            users.push(new User(user));

            console.log(usersData)
            console.log(users)
            //event.target.submit();

            throw { name: 'Info', message: `${userName} is registered successfully!` };
        }
    }
    catch ({ name, message }) {
        notification({ name, msg: message });

        if (name === 'Info') {
            bootstrap.Modal.getOrCreateInstance(regModal).hide();
        }
    }
    finally {
        regForm.reset();
        const inputs = regForm.getElementsByTagName('input');
        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];
            element.classList.remove('is-valid');
            if (index === 0) {
                element.removeAttribute('disabled');
            }
            else {
                element.setAttribute('disabled', '');
            }
        }
        regSubmitBtn.setAttribute('disabled', '');
    }
};

const loginEventHandler = (event) => {
    event.preventDefault();
    const userName = document.getElementById('loginUsername').value;
    const pwHash = md5(document.getElementById('loginPassword').value);

    try {
        const result = users.find(({ username }) => username === userName);

        if (!result) throw new Error('Wrong username!');

        else if (result.pwHash !== pwHash) throw new Error('Wrong password!');

        else {
            result.logIn();

            throw { name: 'Info', message: `${result.name} has logged in successfully` };
        }
    }
    catch ({ name, message }) {
        notification({ name, msg: message })
    }
    finally {
        bootstrap.Modal.getInstance(document.getElementById('logonModal')).hide();
    }
}

const logoutEventHandler = () => {
    const result = users.find(({ userID }) => userID === JSON.parse(localStorage.getItem('VotingApp')).userID);
    result.logOut();
    notification({ name: 'Info', msg: 'You are logged out' })
    //window.location.reload();

}

const voteEventHandler = (event, votes) => {
    try {
        const form = event.target.parentElement.previousElementSibling.querySelector('form');
        const voteId = form.id.split('Vote')[1];

        const vote = votes.get(voteId);
        const voteValue = form.elements[`vote${voteId}Radios`].value;
        if (!vote.doVote(voteValue)) throw new Error('Chooose an option!');
        if (vote.updateAll()) {
            bootstrap.Modal.getOrCreateInstance(viewVoteModal).hide();
            throw { name: 'Info', message: 'Vote registered successfully!' };
        }
    }
    catch ({ name, message }) {
        notification({ name, msg: message });
    }
}

const openViewVoteModalEventHandler = (voteData) => {
    try {
        if (!readLocalStorageLoginStatus()) throw { name: 'Info', message: 'You need log in!' };
        const viewVoteModalHeader = viewVoteModal.children[0].children[0].children[0];
        const viewVoteModalBody = viewVoteModal.children[0].children[0].children[1];
        const viewVoteModalFooter = viewVoteModal.children[0].children[0].children[2];
        const inputs = generateVoteForm(voteData.options, voteData.id);
        if (readLocalStorageUserRole() === 'admin') {
            viewVoteModalFooter.appendChild(voteDeleteBtn);
        }
        viewVoteModalBody.innerHTML = inputs;
        bootstrap.Modal.getOrCreateInstance(viewVoteModal).show();
    }
    catch ({ name, message }) {
        notification({ name, msg: message })
    }
}

const deleteVoteEventHandler = (event, votes) => {
    try {
        if (!readLocalStorageLoginStatus()) throw new Error('You need log in!');
        if (readLocalStorageUserRole() !== 'admin') throw new Error('You are not admin');

        const form = event.target.parentElement.previousElementSibling.querySelector('form');
        const voteId = form.id.split('Vote')[1];

        console.log(votes);
        bootstrap.Modal.getOrCreateInstance(viewVoteModal).hide();
        const voteCard = votes.get(voteId);

        // Remove the vote from DOM
        voteCard.cardContainer.remove();

        // delete the vote from map
        votes.delete(voteId);

        console.log(votes);
        throw {name: 'Info', message: 'Vote deleted successfully'};
    }
    catch ({ name, message }) {
        notification({ name, msg: message })
    }
}

export {
    fullNameEventHandler,
    usernameEventHandler,
    passwordEventHandler,
    regSubmitEventHandler,
    loginEventHandler,
    logoutEventHandler,
    voteEventHandler,
    openViewVoteModalEventHandler,
    deleteVoteEventHandler,
}