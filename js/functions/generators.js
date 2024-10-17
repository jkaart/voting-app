const generateProgressBars = (options, voteId) => {
    let progressBars = "";
    for (const option of options) {
        progressBars += `
            <span>${option}</span>
            <span class="float-end voteCounter">0</span>
            <div class="progress voteProgress" role="progressbar" aria-label="Vote progress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: 0%"></div>
            </div>`
    }
    return progressBars
}

const generateVoteForm = (options, voteId) => {
    let inputs = `<form id='formVote${voteId}'>`;
    for (const [index, option] of options.entries()) {
        inputs += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="vote${voteId}Radios" id="vote${voteId}Radios${index}" value="${option}">
                <label class="form-check-label" for="vote${voteId}Radios${index}">${option}</label>
            </div>`
    }
    inputs += `</form`;
    return inputs
}

export { generateProgressBars, generateVoteForm }