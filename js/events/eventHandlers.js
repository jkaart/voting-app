import { validatePassword } from "../functions/validatePassword.js";

const validatePasswordEvent = (event) => {
    const result = validatePassword(event.target.value);
    let ul = event.target.nextElementSibling;

    if (!result.valid) {
        if (ul === null) {
            ul = document.createElement('ul');
            event.target.after(ul);
        }
        ul.innerText = '';
        result.msg.forEach(msg => {
            const li = document.createElement('li');
            li.innerText = msg;
            ul.appendChild(li);
        });
    }
    else {
        if (ul !== null) {
            ul.remove();
        }
    }
    return result.valid
}

export { validatePasswordEvent }