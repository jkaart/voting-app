import { VoteCard } from "../classes/VoteCard.js";
import { voteEventHandler } from "../events/eventHandlers.js";

const generateVoteCardMap = async (cardDatas, votesArray) => {
    votesArray = [];
        for (const data of cardDatas) {
            const voteCard = new VoteCard(data.id, data.title, data.description, data.options, voteEventHandler);
            votesArray.push(voteCard);
        }
    return votesArray;
};

export { generateVoteCardMap };