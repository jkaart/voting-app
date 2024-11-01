import { validateFullName, validateUsername, validatePassword, validateNewVote, validateNewVoteOption } from "../functions/validate.js";
import { generateValidateErrorList } from "../functions/validateErrorList.js";
import { User } from '../classes/User.js';
import { VoteCard } from "../classes/VoteCard.js";
import { notification } from "../functions/notification.js";
import { generateVoteForm } from "../functions/generators.js";
import { readLocalStorageLoginStatus, readLocalStorageUserId, readLocalStorageUserRole } from "../functions/readLocalStorage.js";
import { loadUsers } from "../functions/loadUsers.js";
import { loginUser, regNewUser, postNewVote} from "../functions/apiRequests.js";
import { login, logout } from "../functions/logInAndLogOut.js";
import { usersData } from "../data/users.js";
import { viewVoteModal, regForm, regUsername, regPassword1, regFullName, regModal, regSubmitBtn, newVoteForm, voteDeleteBtn, newVoteTitle, newVoteDescription, addVoteModal, mainContentDiv, loginUsername, loginPassword } from "../htmlElements/htmlElements.js";

const users = loadUsers(usersData);

console.log(users);

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
        const userName = regUsername.value;
        const role = regForm.querySelector('input[name="regRoleRadio"]:checked').value;
        const pwHash = md5(regPassword1.value);
        const name = regFullName.value;
        const user = { username: userName, password: pwHash, role, name };
        const result = regNewUser(user);
        console.log(result);
        // result
        //     .then(r => notification({name:'info', msg:result.message}))
        //     .then(r=> notification({name,msg:result.message}));
        bootstrap.Modal.getOrCreateInstance(regModal).hide();
    }
    catch ({name, message}) {
        notification({name, msg:message});
        console.log(`${name}:${message}`);
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
            else if (index === 1 || index === 2) {
                continue;
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
    const userName = loginUsername.value;
    const pwHash = md5(loginPassword.value);

    try {
        const user = { username: userName, password: pwHash };
        const result = loginUser(user);
        result
            .then(result => login(result));
        console.log(result);

        throw {name: 'info', message:'User logged in'};
    }
    catch ({ name, message }) {
        notification({ name, msg: message });
    }
    finally {
        bootstrap.Modal.getInstance(document.getElementById('logonModal')).hide();
    }
};

const logoutEventHandler = () => {
    logout();
    notification({ name: 'Info', msg: 'You are logged out' });
};

const voteEventHandler = (event, votes) => {
    try {
        const form = event.target.parentElement.previousElementSibling.querySelector('form');
        const voteId = form.id.split('Vote')[1];

        const vote = votes.get(voteId);
        const voteValue = form.elements[`vote${voteId}Radios`].value;
        if (!vote.doVote(voteValue, readLocalStorageUserId())) throw new Error('Choose an option!');
        if (vote.updateAll()) {
            bootstrap.Modal.getOrCreateInstance(viewVoteModal).hide();
            throw { name: 'Info', message: 'Vote registered successfully!' };
        }
    }
    catch ({ name, message }) {
        notification({ name, msg: message });
    }
};

const openViewVoteModalEventHandler = (voteData) => {
    try {

        if (!readLocalStorageLoginStatus()) throw { name: 'Info', message: 'You need log in!' };
        const userId = readLocalStorageUserId();
        if (userId === null) throw new Error('UserId missing or it is null');
        if (readLocalStorageUserRole() === 'user' && voteData.votedUsers.includes(userId)) throw { name: 'Info', message: 'You have already voted this' };
        const viewVoteModalBody = viewVoteModal.children[0].children[0].children[1];
        const viewVoteModalFooter = viewVoteModal.children[0].children[0].children[2];
        const inputs = generateVoteForm(voteData.options, voteData.id);
        if (readLocalStorageUserRole() === 'admin') {
            viewVoteModalFooter.appendChild(voteDeleteBtn);
        }
        else {
            voteDeleteBtn.remove();
        }
        viewVoteModalBody.innerHTML = inputs;
        bootstrap.Modal.getOrCreateInstance(viewVoteModal).show();
    }
    catch ({ name, message }) {
        notification({ name, msg: message });
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

const addNewVoteEventHandler = () => {
    try {
        if (!readLocalStorageLoginStatus()) throw new Error('You need log in!');
        if (readLocalStorageUserRole() !== 'admin') throw new Error('You are not admin');

        const title = newVoteTitle.value;
        const description = newVoteDescription.value;

        const inputs = newVoteForm.children[1].getElementsByTagName('input');
        const options = [];

        for (const input of inputs) {
            options.push(input.value);
        }

        const data = { title: title, description: description, options: options };
        postNewVote(data);

        bootstrap.Modal.getOrCreateInstance(addVoteModal).hide();
        //throw { name: 'Info', message: 'Vote added successfully!' };
    }
    catch ({ name, message }) {
        notification({ name, msg: message });
    }
};

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

        if (votes.size === 0) {
            mainContentDiv.innerHTML = '<div class="d-flex align-items-center justify-content-center vh-100"><h1 class="text-center">No votes available!</h1></div>';
        }

        console.log(votes);
        throw { name: 'Info', message: 'Vote deleted successfully' };
    }
    catch ({ name, message }) {
        notification({ name, msg: message });
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