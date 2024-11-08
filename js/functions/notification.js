import { toastDiv, notificationMsg } from "../htmlElements/htmlElements.js";

const notification = (message) => {
    console.log(message);
    if (message !== 'undefined') {
        const name = message.name;
        const msg = message.message;
        notificationMsg.textContent = msg;
        notificationMsg.parentElement.classList.add('text-white');
        if (name.toLowerCase() === 'error') {
            notificationMsg.parentElement.classList.remove('bg-success');
            notificationMsg.parentElement.classList.add('bg-danger');
        }
        else if (name.toLowerCase() === 'info') {
            notificationMsg.parentElement.classList.remove('bg-danger');
            notificationMsg.parentElement.classList.add('bg-success');
        }
        else {
            notificationMsg.parentElement.classList.remove('bg-danger', 'bg-success', 'text-white');
        }
        const toast = new bootstrap.Toast(toastDiv);
        toast.show();
    }
};

export { notification };