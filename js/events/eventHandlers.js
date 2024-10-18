import { validateFullName, validateUsername, validatePassword } from "../functions/validate.js";
import { generateValidateErrorList } from "../functions/validateErrorList.js";
import { User } from '../classes/User.js';
import { notification } from "../functions/notification.js";
import { generateVoteForm } from "../functions/generators.js";
import { readUserStatus } from "../functions/readUserStatus.js";
import { usersData } from "../data/users.js";
import { loadUsers } from "../functions/loadUsers.js";
import { viewVoteModal, regForm, regUsername, regFullName, regModal, regSubmitBtn } from "../htmlElements/htmlElements.js";

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
            const pwHash = md5(document.getElementById('regPassword1').value);
            const name = regFullName.value;
            const userDataLength = usersData.length
            const user = {userID: userDataLength, username:userName, pwHash, name} //new User(users.length, userName, pwHash, name);
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
            bootstrap.Modal.getInstance(regModal.hide());
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
        const voteValue = form.elements[`vote${voteId}Radios`].value;
        if (!votes[voteId].doVote(voteValue)) throw new Error('Chooose an option!');
        if (votes[voteId].updateAll()) {
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
        if (!readUserStatus()) throw { name: 'Info', message: 'You need log in!' };
        const viewVoteModalHeader = viewVoteModal.children[0].children[0].children[0];
        const viewVoteModalBody = viewVoteModal.children[0].children[0].children[1];
        const inputs = generateVoteForm(voteData.options, voteData.id)
        viewVoteModalBody.innerHTML = inputs;
        bootstrap.Modal.getOrCreateInstance(viewVoteModal).show();
    }
    catch ({ name, message }) {
        notification({ name, msg: message })
    }
}

export {
    viewVoteModal,
    fullNameEventHandler,
    usernameEventHandler,
    passwordEventHandler,
    regSubmitEventHandler,
    loginEventHandler,
    logoutEventHandler,
    voteEventHandler,
    openViewVoteModalEventHandler,
}