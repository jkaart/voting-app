import { openViewVoteModalEventHandler } from "../events/eventHandlers.js";
import { calcPercentage } from "../functions/percentage.js";
import { generateProgressBars } from "../functions/generators.js";
import { voteContainer } from "../htmlElements/htmlElements.js";

const generateCardContainer = (voteData) => {
    const progressBars = generateProgressBars(voteData.options, voteData.id);
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col');
    cardContainer.id = `vote${voteData.id}Card`;
    cardContainer.innerHTML = `
        <div class="bg-light text-dark card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title text-break">${voteData.title}</h5>
                <h5 class="fs-6 text-nowrap" id="vote${voteData.id}TotalVotes">Total votes: ${voteData.totalVoteCount}</h5>
            </div>
            <div class="card-body">
                <div class="my-2">
                    ${voteData.description}
                </div>
                <div>
                    ${progressBars}
                </div>
            </div>
            <div class='card-footer'>
            </div>
        </div>`;
    return cardContainer;
};

const calcTotalCount = (options) => {
    let totalCount = 0;
    for (const option of options) {
        totalCount += option.voteCount;
    }
    return totalCount;
};

class VoteCard {
    #id;
    constructor(id, title, description, options) {
        this.#id = id;
        this.title = title;
        this.description = description;
        this.options = options;
        this.votedUsers = [];
        this.totalVoteCount = calcTotalCount(this.options);
        this.voteContainer = voteContainer;
        this.card = generateCardContainer(this.voteData);
        this.card.children[0].addEventListener('click', () => { openViewVoteModalEventHandler(this.id); });
        this.cardHeader = this.card.children[0].children[0];
        this.cardBody = this.card.children[0].children[1];
        this.cardFooter = this.card.children[0].children[2];
        this.voteCounterSpans = this.cardBody.querySelectorAll('span.voteCounter');
        this.voteProgressDivs = this.cardBody.querySelectorAll('div.voteProgress');
        this.totalVotesH5 = this.cardHeader.children[1];
        this.updateProgressBars();
    }

    get voteData() {
        const voteData = { id: this.#id, title: this.title, description: this.description, options: this.options, totalVoteCount: this.totalVoteCount, votedUsers: this.votedUsers };
        return voteData;
    }

    set voteData({ title, description, options, votedUsers }) {
        this.title = title;
        this.description = description;
        this.options = options;
        this.votedUsers = votedUsers;
    }

    get id() {
        return this.#id;
    }

    appendCardToDOM() {
        this.voteContainer.append(this.card);
    }

    updateCounts(data) {
        for (const option of data.options) {
            const id = this.options.findIndex(obj => obj.id === option.id);
            this.options[id].voteCount = option.voteCount;
        }
        this.updateTotalCounter();
        return true;
    }
    //this.updateAll();

    updateTotalCounter() {
        this.totalVoteCount = calcTotalCount(this.options);
    }

    updateCounter() {
        for (const [key, value] of this.options.entries()) {
            this.voteCounterSpans[key].textContent = value.voteCount;
        }
    }

    updateProgressBars() {
        this.totalCount = calcTotalCount(this.options);
        for (const [key, value] of this.options.entries()) {
            console.log(key, value);
            const percent = calcPercentage(value.voteCount, this.totalVoteCount);
            this.voteProgressDivs[key].setAttribute('aria-valuenow', percent);
            this.voteProgressDivs[key].children[0].style.width = `${percent}%`;
            this.voteProgressDivs[key].children[0].textContent = `${percent}%`;
        }
    }

    updateTotalVotes() {
        this.totalVotesH5.textContent = `Total votes: ${this.totalVoteCount}`;
    }

    updateAll() {
        this.updateTotalVotes();
        this.updateCounter();
        this.updateProgressBars();
    }
}

export { VoteCard };