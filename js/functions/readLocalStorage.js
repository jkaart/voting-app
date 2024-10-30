const readLocalStorageLoginStatus = () => {
    if (localStorage.getItem('VotingApp') === null) return false;
    const item = JSON.parse(localStorage.getItem('VotingApp'));
    if (item === null) return false;
    if (item.isLoggedIn === null) return false;
    return true;
};

const readLocalStorageUserRole = () => {
    if (localStorage.getItem('VotingApp') === null) return false;
    const item = JSON.parse(localStorage.getItem('VotingApp'));
    if (item === null) return false;
    if (item.role === null) return false;
    return item.role;
};

const readLocalStorageUserId = () => {
    if (localStorage.getItem('VotingApp') === null) return null;
    const item = JSON.parse(localStorage.getItem('VotingApp'));
    if (item === null) return null;
    return item.userID;
};

export { readLocalStorageLoginStatus, readLocalStorageUserRole, readLocalStorageUserId };