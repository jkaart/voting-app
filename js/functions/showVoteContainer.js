import { mainContentDiv, voteContainer } from "../htmlElements/htmlElements.js";

const appendVoteContainer = (votesLength) => {
    if (votesLength === 0) {
        mainContentDiv.innerHTML = '';
        mainContentDiv.appendChild(voteContainer);
    }
};

export { appendVoteContainer };
