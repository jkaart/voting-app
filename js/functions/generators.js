const generateProgressBars = (options, voteId) => {
    let progressBars = "";

    for (const value of options) {
        progressBars += `
            <span>${value.option}</span>
            <span class="float-end voteCounter">${value.voteCount}</span>
            <div class="progress voteProgress" role="progressbar" aria-label="Vote progress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: 0%"></div>
            </div>`
    }
    return progressBars
}

const generateVoteForm = (options, voteId) => {
    let inputs = `<form id='formVote${voteId}'>`;

    for (const [key, value] of options.entries()) {
        inputs += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="vote${voteId}Radios" id="vote${voteId}Radios${key}" value="${value.option}">
                <label class="form-check-label" for="vote${voteId}Radios${key}">${value.option}</label>
            </div>`;
    }
    inputs += `</form`;
    return inputs
}

export { generateProgressBars, generateVoteForm }