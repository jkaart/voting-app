import { User } from "../classes/User.js"

const loadUsers = (usersData) => {
    const users = []
    for (const [key,user] of usersData.entries()) {
        users.push(new User({userID:key, username:user.username, pwHash:user.pwHash, name:user.name, role:user.role}));
    }
    return users;
}

export { loadUsers }