import { userNameSpan, showRegModal, logoutBtn, logonBtn, loginForm, showAddVoteModalBtn } from "../htmlElements/htmlElements.js";
import { notification } from "./notification.js";
import { readLocalStorage, writeLocalStorageUserInfo, clearLocalStorage } from "./readLocalStorage.js";

const login = (userInfo) => {
    try {
        if(userInfo.error) throw new Error(userInfo.error);

        // Reset login form;
        loginForm.reset();

        writeLocalStorageUserInfo(userInfo);

        const name = readLocalStorage('name');
        // Show full name of the logged in user in the navbar
        if (name) {
            const role = readLocalStorage('role');
            userNameSpan.textContent = `Welcome ${name}`;
            userNameSpan.classList.remove('d-none');

            // hide register button
            showRegModal.classList.add('d-none');

            // Show logout button
            logoutBtn.classList.remove('d-none');

            // Hide logon button
            logonBtn.classList.add('d-none');

            if (role === 'admin') {
                showAddVoteModalBtn.classList.remove('d-none');
            }
            throw({ name: 'info', message: 'User logged in' });
        }
    }
    catch (message) {
        notification(message);
        console.log(message);
    }
};

const logout = () => {
    clearLocalStorage();

    // Hide logout button
    logoutBtn.classList.add('d-none');

    // Show login button
    logonBtn.classList.remove('d-none');

    // Show register button
    showRegModal.classList.remove('d-none');

    // Remove full name of logged in user from the navbar
    userNameSpan.textContent = '';
    userNameSpan.classList.add('d-none');

    showAddVoteModalBtn.classList.add('d-none');

    console.log('logout');
};

export { login, logout };