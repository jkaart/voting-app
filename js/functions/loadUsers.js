import { User } from "../classes/User.js"

const loadUsers = (usersData) => {
    const users = []
    for (const [key,user] of usersData.entries()) {
        users.push(new User(key, user.username, user.pwHash, user.name));
    }
    return users;
}

export { loadUsers }