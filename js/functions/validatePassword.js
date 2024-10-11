const validateUsername = (username) => {
    const errors = [
        'The username must be 3 character or over long',
        'The username must contain only small letters'
    ]

    let valid = false;
    let msg = [];
    if (username.length < 3) {
        msg.push(errors[0]);
    };
    if (!/^[a-z]+$/g.test(username)){
        msg.push(errors[1]);
    };
    if (msg.length === 0) {
        valid = true;
    };


    return { valid, msg };
}

const validatePassword = (password) => {
    const errors = [
        'The password must be 8 character or over long',
        'The password must contain one of the a-z lowercase letter',
        'The password must contain one of the A-Z uppercase letter',
        'The password must contain one of the following special characters: @.#$!%*?&^'
    ];

    let valid = false;
    let msg = [];
    if (password.length <= 8) {
        msg.push(errors[0]);
    };
    if (!/^(?=.*[a-z])/.test(password)) {
            msg.push(errors[1]);
    };
    if (!/^(?=.*[A-Z])/.test(password)) {
            msg.push(errors[2]);
    };
    if (!/^(?=.*[@.#$!%*?&^])/.test(password)) {
            msg.push(errors[3]);
    };
    if (msg.length === 0) {
        valid = true;
    };
    return { valid, msg };
}

const comparePasswords = (pw1, pw2) => {
    let msg = '';
    let match = true;
    if (pw1 !== pw2) {
        match = false;
        msg = 'Passwords do not match!'
    };
    return { match, msg };
}



export { validateUsername, validatePassword, comparePasswords }