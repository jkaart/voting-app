const readUserStatus = () => {
    if (localStorage.getItem('VotingApp') === null) return false;
    const item = JSON.parse(localStorage.getItem('VotingApp'));
    if (item === null) return false;
    if (item.isLoggedIn === null) return false;
    return true;
}

export { readUserStatus }