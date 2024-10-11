class User {
    constructor(userID, username, pwHash, name) {
        this.userID = userID;
        this.username = username;
        this.pwHash = pwHash;
        this.name = name
    }
}

export {User}