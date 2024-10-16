import { users } from "../data/users.js";
import { votingSituations } from "../data/votes.js";
import { validateFullName, validateUsername, validatePassword } from "../functions/validate.js";
import { generateValidateErrorList } from "../functions/validateErrorList.js";
import { User } from '../classes/User.js';
import { notification } from "../functions/notification.js";

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
    const userName = document.getElementById('regUsername').value;
    try {
        const result = users.find(({ username }) => username === userName);
        if (result) throw new Error(`${userName} is already registered!`);
        else {
            const pwHash = md5(document.getElementById('regPassword1').value);
            const name = document.getElementById('regFullName').value;
            const user = new User(users.length, userName, pwHash, name);
            users.push(user);
            //event.target.submit();

            throw { name: 'Info', message: `${userName} is registered successfully!` };
        }
    }
    catch ({ name, message }) {
        notification({ name, msg: message });

        if (name === 'Info') {
            bootstrap.Modal.getInstance(document.getElementById('regModal')).hide();
        }
    }
    finally {
        document.getElementById('regForm').reset();
        const inputs = document.getElementById('regForm').getElementsByTagName('input');
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
        document.getElementById('regSubmit').setAttribute('disabled', '');
    }
    console.log(users)
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
            // Save login data to local storage
            localStorage.setItem('VotingApp', JSON.stringify({ userName: result.username, name: result.name }));
            // Reset login form fields
            document.getElementById('loginForm').reset()

            // Show full name of the logged in user
            const user = document.getElementById('user');
            user.textContent = `Welcome ${JSON.parse(localStorage.getItem('VotingApp')).name}`;
            user.classList.remove('d-none');

            // hide register button
            document.getElementById('showRegForm').classList.add('d-none');

            // Show logout button
            document.getElementById('logout').classList.remove('d-none');

            // Hide logon button
            document.getElementById('showLogonForm').classList.add('d-none');

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
    localStorage.removeItem('VotingApp');
    document.getElementById('logout').classList.add('d-none');
    document.getElementById('showLogonForm').classList.remove('d-none');
    document.getElementById('showRegForm').classList.remove('d-none');
    const user = document.getElementById('user');
    user.textContent = '';
    user.classList.add('d-none');
    console.log('logged out')
    notification({ name: 'Info', msg: 'You are logged out' })
    //window.location.reload();

}

const voteEventHandler = (event) => {
    try {
        console.log(event)
        console.log(event.target)
        const form = event.target.parentElement.previousElementSibling.querySelector('form');
        const voteId = form.id.split('F')[0];
        let voteValue = form.elements[`${voteId}VoteRadios`].value;
        if (voteValue === '') throw new Error('Choose an option!')
        if (votingSituations[voteId] === undefined) {
            votingSituations[voteId] = {}
        }
        let votes = votingSituations[voteId];
        if (isNaN(votes[voteValue])) {
            votes[voteValue] = 0;
        }
        votes[voteValue] += 1;
        throw { name: 'Info', message: 'Vote registered successfully!' }
    }
    catch ({ name, message }) {
        notification({ name, msg: message });
    }
    console.log(votingSituations)
}

export {
    fullNameEventHandler,
    usernameEventHandler,
    passwordEventHandler,
    regSubmitEventHandler,
    loginEventHandler,
    logoutEventHandler,
    voteEventHandler
}