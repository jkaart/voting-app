import { notification } from "./notification.js";

const backEndUrl = 'http://localhost:3001/api';

const votesPostRequest = new Request(backEndUrl + "/votes", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: '',
});

const usersPostRequest = new Request(backEndUrl + "/users", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: '',
});

const loginPostRequest = new Request(backEndUrl + "/users/login", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: '',
});

const getAllVotes = async () => {
    try {
        const res = await fetch(backEndUrl + '/votes');
        if (!res.ok) {
            const message = `An error has occured: ${res.status}`;
            throw new Error(message);
        }
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log(error);
        notification({ name: 'Error', msg: error.message });
    }
};

const post = async (request) => {
    try {
        const response = await fetch(request);
        if (!response.ok) {
            const errorMsg = await response.json();
            throw new Error(errorMsg.message);
        }
        const json = await response.json();
        const result = await json;
        console.log("Success:", result);
        if (!result.token) {
            notification({ name: 'info', msg: result.message });
        }
        return result;
    } catch (error) {
        console.error("Error:", error);
        notification({ name: 'error', msg: error.message });
    }
};

const postNewVote = (data) => {
    const request = new Request(votesPostRequest, {
        body: JSON.stringify(data),
    });
    post(request);
};

const regNewUser = (data) => {
    const request = new Request(usersPostRequest, {
        body: JSON.stringify(data),
    });
    post(request);
};

const loginUser = (data) => {
    const request = new Request(loginPostRequest, {
        body: JSON.stringify(data),
    });
    const response = post(request);
    return response;
};

export { getAllVotes, postNewVote, regNewUser, loginUser };