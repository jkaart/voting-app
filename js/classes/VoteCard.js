const generateInputs = (options, voteId) => {
    let inputs = ""
    for (let index = 0; index < options.length; index++) {
        const option = options[index];
        inputs += `<div class="form-check">
                    <input class="form-check-input" type="radio" name="${voteId}VoteRadios" id="vote${voteId}Radios${index}" value="${option}">
                    <label class="form-check-label" for="vote${voteId}Radios${index}">${option}</label>
                </div>
                
                `
    }
    return inputs
}

class VoteCard {
    constructor(id, title, description, options, eventHandler) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.options = options;
        this.eventHandler = eventHandler;
        this.inputs = generateInputs(this.options,this.id);
        this.voteContainer = document.getElementById('voteContainer').children[0];
        this.cardContainer = document.createElement('div');
    }

    draw() {
        this.cardContainer.classList.add('col');
        this.cardContainer.innerHTML = 
            `<div class="col">
                <div class="text-bg-light card">
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        ${this.description}
                        <form id="${this.id}Form">
                        ${this.inputs}
                        </form>
                    </div>
                    <div class='card-footer'>
                        <button type="button" id="vote${this.id}BtnSubmit" class="btn btn-primary">Vote</button>
                    </div>
                </div>
            </div>`;
        
        this.voteContainer.appendChild(this.cardContainer);
        document.getElementById(`vote${this.id}BtnSubmit`).addEventListener('click', this.eventHandler);
    }

}

export { VoteCard }