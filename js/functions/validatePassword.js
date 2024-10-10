const validatePassword = (password) => {
    const errors = [
        'The password must be 8 character or over long',
        'The password must contain a lowercase letter',
        'The password must contain a uppercase letter',
        'The password must contain one of the following special characters: @.#$!%*?&^'
    ]

    let valid = false;
    let msg = [];
    if (password.length <= 8) {
        if (msg.indexOf(errors[0] === -1)) {
            msg.push(errors[0]);
        };
    };
    if (!/^(?=.*[a-z])/.test(password)) {
        if (msg.indexOf(errors[1] === -1)) {
            msg.push(errors[1]);
        };
    };
    if (!/^(?=.*[A-Z])/.test(password)) {
        if (msg.indexOf(errors[2] === -1)) {
            msg.push(errors[2]);
        };
    };
    if (!/^(?=.*[@.#$!%*?&^])/.test(password)) {
        if (msg.indexOf(errors[3] === -1)) {
            msg.push(errors[3]);
        };
    };
    if (msg.length === 0) {
        valid = true;
    };
    console.log(valid)
    return { valid, msg }
}

const comparePasswords = (pw1, pw2) => {
    let msg = '';
    let match = true;
    if (pw1 !== pw2) {
        match = false;
        msg = 'Passwords do not match!'
    }
    return { match, msg }
}

export { validatePassword, comparePasswords }