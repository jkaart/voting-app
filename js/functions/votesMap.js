import { VoteCard } from "../classes/VoteCard.js";
import { voteEventHandler } from "../events/eventHandlers.js";

const generateVoteCardMap = (votes) => {
    const map = new Map();
    votes.forEach(voteData => {
        map.set(voteData.id, new VoteCard(voteData.id, voteData.title, voteData.description, voteData.options, voteEventHandler));
    });
    return map;
};

export { generateVoteCardMap };