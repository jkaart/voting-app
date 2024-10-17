const readUserStatus = () => {
    const item = JSON.parse(localStorage.getItem('VotingApp'))
    console.log(item)
    if (localStorage.getItem('VotingApp') === 'null' || item === null || item.isLoggedIn === 'null') return false;
    return true
}

export { readUserStatus }