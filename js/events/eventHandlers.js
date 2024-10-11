import { users } from "../data/users.js";
import { validateUsername, validatePassword } from "../functions/validatePassword.js";
import { generateValidateErrorList } from "../functions/validateErrorList.js";
import {User} from '../classes/User.js';

const validateUsernameEventHandler = (event) => {
    const result = validateUsername(event.target.value);
    generateValidateErrorList(event, result);

    return result.valid
}

const validatePasswordEventHandler = (event) => {
    const result = validatePassword(event.target.value);
    generateValidateErrorList(event, result);

    return result.valid
}

const regFormEventHandler = (event) => {
    event.preventDefault();
    const userName = document.getElementById('regUsername').value;
    const pwHash = md5(document.getElementById('regPassword1').value);
    const name = document.getElementById('regFullName').value;
    const user = new User(1, userName, pwHash, name);
    console.log(user);
    users.push(user);
    //event.target.submit();

    bootstrap.Modal.getInstance(document.getElementById('regModal')).hide();

};

export { validateUsernameEventHandler, validatePasswordEventHandler, regFormEventHandler }