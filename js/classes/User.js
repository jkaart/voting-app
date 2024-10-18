import { login, logout  } from "../functions/login.js";

class User {
    #userID;
    #username;
    #pwHash;
    constructor({userID, username, pwHash, name}) {
        this.#userID = userID;
        this.#username = username;
        this.#pwHash = pwHash;
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

    logIn() {
        this.isLoggedIn = true;
        // Save login data to local storage
        localStorage.setItem('VotingApp', JSON.stringify({ userID:this.#userID, userName: this.username, name: this.name, isLoggedIn:this.isLoggedIn }));
        login();
    }

    logOut() {
        this.isLoggedIn = false;
        // Remove login data from local storage
        localStorage.removeItem('VotingApp');
        logout();
    }
}

export {User}