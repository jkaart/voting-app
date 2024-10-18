import { VoteCard } from "../classes/VoteCard.js";
import { voteEventHandler } from "../events/eventHandlers.js";

const generateVoteCardArray = (votes) => {
    const arr = [];
    votes.forEach(voteData => {
        console.log(voteData.options)
        const vote = new VoteCard(voteData.id, voteData.title, voteData.description, voteData.options, voteEventHandler);
        arr.push(vote);

    });
    return arr;
}

export { generateVoteCardArray }