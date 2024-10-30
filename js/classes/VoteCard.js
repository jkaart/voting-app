import { openViewVoteModalEventHandler } from "../events/eventHandlers.js";
import { calcPercentage } from "../functions/percentage.js";
import { generateProgressBars } from "../functions/generators.js";
import { voteContainer } from "../htmlElements/htmlElements.js";

const generateCardContainer = (voteData) => {
    const progressBars = generateProgressBars(voteData.options, voteData.id);
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col');
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
        </div>`
    return cardContainer
}

const calcTotalCount = (options) => {
    let totalCount = 0;
    for (const option of options) {
        totalCount += option.voteCount;
    }
    return totalCount;
}

class VoteCard {
    #id
    constructor(id, title, description, options) {
        this.#id = id;
        this.title = title;
        this.description = description;
        this.options = options;
        this.totalVoteCount = calcTotalCount(this.options);
        this.voteContainer = voteContainer;
        this.cardContainer = generateCardContainer(this.voteData);
        this.cardContainer.children[0].addEventListener('click', () => { openViewVoteModalEventHandler(this.voteData) });
        this.voteContainer.appendChild(this.cardContainer);
        this.cardHeader = this.cardContainer.children[0].children[0];
        this.cardBody = this.cardContainer.children[0].children[1];
        console.log(this.cardBody)
        this.cardFooter = this.cardContainer.children[0].children[2];
        this.voteCounterSpans = this.cardBody.querySelectorAll('span.voteCounter');
        this.voteProgressDivs = this.cardBody.querySelectorAll('div.voteProgress');
        this.totalVotesH5 = this.cardHeader.children[1];
        this.updateProgressBars();
    }

    get voteData() {
        const voteData = { id: this.#id, title: this.title, description: this.description, options: this.options, totalVoteCount: this.totalVoteCount };
        return voteData
    }

    get id() {
        return this.#id;
    }

    doVote(value) {
        if (value === '') return false;
        const index = this.options.findIndex((element) => element.option == value);
        this.options[index].voteCount += 1;
        this.updateTotalCounter();
        return true;
    }

    updateTotalCounter() {
        this.totalVoteCount = calcTotalCount(this.options);
    }

    updateCounter() {
        for (const [key, value] of this.options.entries()) {
            this.voteCounterSpans[key].textContent = value.voteCount;
        }
    }

    updateProgressBars() {
        for (const [key, value] of this.options.entries()) {
            const percent = calcPercentage(value.voteCount, this.totalVoteCount);
            this.voteProgressDivs[key].setAttribute('aria-valuenow', percent);
            this.voteProgressDivs[key].children[0].style.width = `${percent}%`
            this.voteProgressDivs[key].children[0].textContent = `${percent}%`
        }
    }

    updateTotalVotes() {
        this.totalVotesH5.textContent = `Total votes: ${this.totalVoteCount}`
    }

    updateAll() {
        this.updateCounter();
        this.updateProgressBars();
        this.updateTotalVotes();
        return true
    }
}

export { VoteCard }