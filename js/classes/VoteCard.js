import { openVoteModalEventHandler} from "../events/eventHandlers.js";
import { calcPercentage } from "../functions/percentage.js";
import { generateProgressBars } from "../functions/generators.js"

const generateCardContainer = (voteData) => {
    const progressBars = generateProgressBars(voteData.options, voteData.id);
    console.log(voteData)
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col');
    cardContainer.innerHTML = `<div class="col">
                <div class="text-bg-light card">
                    <div class="card-body">
                        <div>
                            <h5 class='float-end fs-6' id='totalVotes'>Total votes: ${voteData.totalVoteCount}</h5>
                            <h5 class="card-title">${voteData.title}</h5>
                        </div>
                        <div>
                        ${voteData.description}
                        </div>
                        <div>
                            ${progressBars}
                        </div>
                    </div>
                    <div class='card-footer'>
                    </div>
                </div>
            </div>`
    return cardContainer
}

const generateVotesObject = (options) => {
    let votes = {};
    for (const option of options) {
        votes[option] = 0;
    }
    return votes
}

class VoteCard {
    constructor(id, title, description, options) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.options = options;
        this.totalVoteCount = 0;
        this.votes = generateVotesObject(this.options);
        this.voteContainer = document.getElementById('voteContainer').children[0];
        this.cardContainer = this.draw();
        this.voteBody = this.cardContainer.children[0].children[0].children[0].children[2]
        this.voteCounterSpans = this.voteBody.querySelectorAll('span.voteCounter');
        this.voteProgressDivs = this.voteBody.querySelectorAll('div.voteProgress');
        this.totalVotesH5 = this.cardContainer.children[0].children[0].children[0].children[0].children[0]
        console.log(this.totalVotesH5)
    }

    get voteData() {
        const voteData = {id:this.id, title:this.title, description:this.description, options:this.options, totalVoteCount:this.totalVoteCount}
        return voteData
    }

    doVote(value) {
        if (value === '') return false;
        this.totalVoteCount += 1;
        this.votes[value] += 1;
        return true;
    }

    draw() {
        const cardContainer = generateCardContainer(this.voteData);
        cardContainer.addEventListener('click', ()=> {openVoteModalEventHandler(this.voteData)})
        this.voteContainer.appendChild(cardContainer);
        return cardContainer
    }

    updateCounter() {
        console.log(this.voteCounterSpans)
        for (const [key, vote] of Object.values(this.votes).entries()) {
            this.voteCounterSpans[key].textContent = vote;
        }
    }

    updateProgressBars() {
        for (const [key, vote] of Object.values(this.votes).entries()) {
            const percent = calcPercentage(vote, this.totalVoteCount);
            this.voteProgressDivs[key].setAttribute('aria-valuenow', percent);
            this.voteProgressDivs[key].children[0].style.width = `${percent}%`
            this.voteProgressDivs[key].children[0].textContent = `${percent}%`
        }
    }

    updateTotalVotes() {
        this.totalVotesH5.textContent = `Total votes: ${this.totalVoteCount}`
    }

    updateAll() {
        this.updateCounter()
        this.updateProgressBars();
        this.updateTotalVotes();
        return true
    }
}

export { VoteCard }