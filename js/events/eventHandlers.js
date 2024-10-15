import { users } from "../data/users.js";
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
        notification(message);

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
            localStorage.setItem('username', userName);

            //show logged user name
            const user = document.getElementById('user');
            user.textContent = userName;
            user.classList.remove('d-none');

            // hide register button
            document.getElementById('showRegForm').classList.add('d-none');

            // Show logout button
            document.getElementById('logout').classList.remove('d-none');

            // Hide logon button
            document.getElementById('showLogonForm').classList.add('d-none');

            throw { name: 'info', message: `${userName} is logged in successfully` };

        }
    }
    catch ({name,message}) {
        notification(message)
    }
    finally {
        bootstrap.Modal.getInstance(document.getElementById('logonModal')).hide();
    }
}

const logoutEventHandler = (event) => {
    localStorage.removeItem('username');
    document.getElementById('logout').classList.add('d-none');
    document.getElementById('showLogonForm').classList.remove('d-none');
    document.getElementById('showRegForm').classList.remove('d-none');
    const user = document.getElementById('user');
    user.textContent = '';
    user.classList.add('d-none');
    console.log('logged out')
    notification('logged out')
    //window.location.reload();

}

export {
    fullNameEventHandler,
    usernameEventHandler,
    passwordEventHandler,
    regSubmitEventHandler,
    loginEventHandler,
    logoutEventHandler
}