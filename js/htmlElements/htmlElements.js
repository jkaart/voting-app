// Bootstrap modals
const viewVoteModal = document.getElementById('viewVoteModal');
const regModal = document.getElementById('regModal');
const showRegModal = document.getElementById('showRegModal');

// Forms
const regForm = document.getElementById('regForm');
const loginForm = document.getElementById('loginForm');


// Input fields
const regUsername = document.getElementById('regUsername');
const regFullName = document.getElementById('regFullName');
const regUser = document.getElementById('regUsername');
const regPassword1 = document.getElementById('regPassword1');
const regPassword2 = document.getElementById('regPassword2');

// Buttons
const regSubmitBtn = document.getElementById('regSubmit');
const regReturnBtn = document.getElementById('regInfoReturnBtn');
const logonBtn = document.getElementById('showLogonForm');
const logoutBtn = document.getElementById('logout');
const loginSubmitBtn = document.getElementById('loginSubmit');
const voteSubmitBtn = document.getElementById('voteSubmit');

// Spans
const userNameSpan = document.getElementById('user');

// Container divs
const voteContainer = document.getElementById('voteContainer');

export {
    viewVoteModal,
    regModal,
    showRegModal,
    regForm,
    loginForm,
    regUsername,
    regFullName,
    regUser,
    regPassword1,
    regPassword2,
    regSubmitBtn,
    regReturnBtn,
    logonBtn,
    logoutBtn,
    loginSubmitBtn,
    voteSubmitBtn,
    userNameSpan,
    voteContainer
}