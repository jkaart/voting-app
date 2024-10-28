import { login, logout } from "../functions/logInAndLogOut.js";

class User {
    #userID;
    #username;
    #pwHash;
    #role;
    constructor({ userID, username, role = 'user', pwHash, name }) {
        this.#userID = userID;
        this.#username = username;
        this.#pwHash = pwHash;
        this.#role = '';
        this.role = role;
        this.name = name;
        this.isLoggedIn = false;
    }

    get username() {
        return this.#username;
    }

    get pwHash() {
        return this.#pwHash;
    }

    get userID() {
        return this.#userID;
    }

    get role() {
        return this.#role;
    }

    /**
     * @param {string} role
     */
    set role(role) {
        if (role === 'admin' || role === 'user') {
            this.#role = role;
        }
        else {
            throw SyntaxError('User role must be admin or user');
        }

    }

    logIn() {
        this.isLoggedIn = true;
        // Save login data to local storage
        localStorage.setItem('VotingApp', JSON.stringify({ userID: this.#userID, userName: this.username, name: this.name, role: this.role, isLoggedIn: this.isLoggedIn }));
        login();
    }

    logOut() {
        this.isLoggedIn = false;
        // Remove login data from local storage
        localStorage.removeItem('VotingApp');
        logout();
    }
}

export { User }