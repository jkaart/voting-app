import { users } from "../data/users.js";
import { validateFullName, validateUsername, validatePassword } from "../functions/validate.js";
import { generateValidateErrorList } from "../functions/validateErrorList.js";
import { User } from '../classes/User.js';

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
            const user = new User(1, userName, pwHash, name);
            users.push(user);
            //event.target.submit();

            throw { name: 'Info', message: `${userName} is registered successfully!` };
        }
    }
    catch ({ name, message }) {
        const formModalBody = document.getElementById('regFormModalBody');
        const formModalFooter = document.getElementById('regFormModalFooter');

        const infoModalBody = document.getElementById('regInfoModalBody');
        const infoModalFooter = document.getElementById('regInfoModalFooter');

        document.getElementById('regInfoMsg').textContent = message;

        formModalBody.classList.add('d-none');
        formModalFooter.classList.add('d-none');
        infoModalBody.classList.remove('d-none');
        if (name === 'Error') {
            infoModalFooter.classList.remove('d-none');
        }
        else {
            setTimeout(() => {
                bootstrap.Modal.getInstance(document.getElementById('regModal')).hide();
                infoModalBody.classList.add('d-none');
                formModalBody.classList.remove('d-none');
                formModalFooter.classList.remove('d-none');
            }, 3000);
        }
    }
    finally {
        document.getElementById('regForm').reset();
        const inputs = document.getElementById('regForm').getElementsByTagName('input');
        console.log(inputs)
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

const loginFormEventHandler = (event) => {
    event.preventDefault();
    const userName = document.getElementById('loginUsername').value;
    const pwHash = md5(document.getElementById('loginPassword').value);

    try {
        const result = users.find(({ username }) => username === userName);

        if (!result) throw 'Wrong username!';

        else if (result.pwHash !== pwHash) throw 'Wrong password!';

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

            console.log(userName + ' is logged in');
        }
    }
    catch (error) {
        console.log(error);
    }
}

const logoutEventHandler = (event) => {
    (event) => {
        localStorage.removeItem('username');
        document.getElementById('logout').classList.add('d-none');
        document.getElementById('showLogonForm').classList.remove('d-none');
        document.getElementById('showRegForm').classList.remove('d-none');
        console.log('logged out')

        //window.location.reload();
    }

}

export {
    fullNameEventHandler,
    usernameEventHandler,
    passwordEventHandler,
    regSubmitEventHandler,
    loginFormEventHandler,
    logoutEventHandler
}