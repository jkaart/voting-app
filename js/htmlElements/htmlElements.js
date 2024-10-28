// Bootstrap modals
const viewVoteModal = document.getElementById('viewVoteModal');
const regModal = document.getElementById('regModal');
const showRegModal = document.getElementById('showRegModal');

// Bootstrap modal bodys and footers
const regFormModalBody = document.getElementById('regFormModalBody');
const regInfoModalBody = document.getElementById('regInfoModalBody');
const regFormModalFooter = document.getElementById('regFormModalFooter');
const regInfoModalFooter = document.getElementById('regInfoModalFooter');

// Forms
const regForm = document.getElementById('regForm');
const loginForm = document.getElementById('loginForm');
const newVoteForm = document.getElementById('newVoteForm');


// Input fields
const regUsername = document.getElementById('regUsername');
const regFullName = document.getElementById('regFullName');
const regUser = document.getElementById('regUsername');
const regPassword1 = document.getElementById('regPassword1');
const regPassword2 = document.getElementById('regPassword2');
const newVoteTitle = document.getElementById('newVoteTitle');
const newVoteDescription = document.getElementById('newVoteDescription');

// Buttons
const regSubmitBtn = document.getElementById('regSubmit');
const regReturnBtn = document.getElementById('regInfoReturnBtn');
const logonBtn = document.getElementById('showLogonForm');
const logoutBtn = document.getElementById('logout');
const loginSubmitBtn = document.getElementById('loginSubmit');
const voteSubmitBtn = document.getElementById('voteSubmit');
const showAddVoteModalBtn = document.getElementById('showAddVoteModal');
const addNewVoteSubmitBtn = document.getElementById('addVoteSubmit');

const voteDeleteBtn = document.createElement('button');
voteDeleteBtn.classList.add('btn', 'btn-danger');
voteDeleteBtn.textContent = 'Delete this vote';

// Spans
const userNameSpan = document.getElementById('user');

// Container divs
const voteContainer = document.getElementById('voteContainer');

export {
    viewVoteModal,
    regModal,
    showRegModal,
    regFormModalBody,
    regInfoModalBody,
    regFormModalFooter,
    regInfoModalFooter,
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
    showAddVoteModalBtn,
    addNewVoteSubmitBtn,
    voteDeleteBtn,
    newVoteForm,
    newVoteTitle,
    newVoteDescription,
    userNameSpan,
    voteContainer
}