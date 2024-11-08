const checkLocalStorage = () => {
    if (localStorage.getItem('VotingApp') === null) return false;
    const item = JSON.parse(localStorage.getItem('VotingApp'));
    if (item === null) return false;
    return item;
};

const clearLocalStorage = () => {
    localStorage.removeItem('VotingApp');
    return true;
};

const checkTokenFromLocalStorage = () => {
    const token = readLocalStorage('token');
    console.log(token);
    if (!token) {
        return false;
    }
    return true;
};

const readLocalStorage = (key) => {
    const item = checkLocalStorage();
    if (!item || item[key] === null) return false;
    return item[key];
};

const writeLocalStorageUserInfo = (userInfo) => {
    clearLocalStorage();
    localStorage.setItem('VotingApp', JSON.stringify(userInfo));
};


export { checkTokenFromLocalStorage, readLocalStorage, writeLocalStorageUserInfo, clearLocalStorage };