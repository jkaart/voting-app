import { notification } from "./notification.js";
import { checkTokenFromLocalStorage, readLocalStorage } from "./readLocalStorage.js";

const backEndUrl = 'http://localhost:3001/api';

const fetchRequest = async (request) => {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const obj = await response.json();
            return obj;
        }
        else {
            if (response.status === 404 || response.status === 500) throw new Error(response.statusText);
            throw new Error(response.status);
        }

    } catch (error) {
        notification(error);

        console.log(error);
        return false;

    }
};

const getAllVotes = async () => {
    const request = new Request(backEndUrl + '/votes', {
        method: 'GET'
    });
    const response = fetchRequest(request);
    console.log(response);
    return response;

};

const postNewVote = async (data) => {
    /* const error = checkTokenFromLocalStorage();
    if (error) {
        return error;
    } */
    const request = new Request(backEndUrl + "/vote", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${readLocalStorage('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const response = await fetchRequest(request);
    return response;
};

const getVote = (voteId) => {
    const token = readLocalStorage('token');
    if (token !== null) {
        const request = new Request(backEndUrl + `/vote/${voteId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const response = fetchRequest(request);
        return response;
    }
    return new Error('Token is null')
};

const deleteVote = (voteId) => {
    const request = new Request(backEndUrl + `/vote/${voteId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${readLocalStorage('token')}`
        },
    });
    const response = fetchRequest(request)
    return response
};

const votingVote = (voteId, voteOptionId) => {
    const token = readLocalStorage('token');
    if (token !== null) {
        const request = new Request(backEndUrl + `/voting/${voteId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "voteOptionId": voteOptionId })
        });
        const response = fetchRequest(request);
        return response;
    }
};

const regNewUser = (data) => {
    const request = new Request(backEndUrl + "/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const response = fetchRequest(request);
    return response
};

const loginUser = (data) => {
    const request = new Request(backEndUrl + "/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    });
    const response = fetchRequest(request);
    return response;
};

export { getAllVotes, postNewVote, getVote, deleteVote, votingVote, regNewUser, loginUser };