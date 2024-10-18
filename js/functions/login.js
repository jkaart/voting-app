import { userNameSpan, showRegModal, logoutBtn, logonBtn, loginForm } from "../htmlElements/htmlElements.js";

const login = () => {
    // Reset login form;
    loginForm.reset();

    // Show full name of the logged in user in the navbar
    userNameSpan.textContent = `Welcome ${JSON.parse(localStorage.getItem('VotingApp')).name}`;
    userNameSpan.classList.remove('d-none');

    // hide register button
    showRegModal.classList.add('d-none');

    // Show logout button
    logoutBtn.classList.remove('d-none');

    // Hide logon button
    logonBtn.classList.add('d-none');
}

const logout = () => {
    // Hide logout button
    logoutBtn.classList.add('d-none');

    // Show login button
    logonBtn.classList.remove('d-none');

    // Show register button
    showRegModal.classList.remove('d-none');

    // Remove full name of logged in user from the navbar
    userNameSpan.textContent = '';
    userNameSpan.classList.add('d-none');
    console.log('logout')
}

export { login, logout }