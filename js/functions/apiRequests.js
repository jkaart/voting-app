const backEndUrl = 'http://localhost:3001/api';

const getAllVotes = async () => {
    const res = await fetch(backEndUrl + '/votes');
    const data = await res.json();
    return data;
};

export { getAllVotes };