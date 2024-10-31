import { notification } from "./notification.js";

const backEndUrl = 'http://localhost:3001/api';

const getAllVotes = async () => {
    const res = await fetch(backEndUrl + '/votes');
    const data = await res.json();
    return data;
};

const postVote = (data) => {
    fetch(backEndUrl + '/votes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => Object.entries(data)[0])
        .then(data => notification({name:data[0],msg:data[1]}));
};
export { getAllVotes, postVote };