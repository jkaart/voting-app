const notification = ({msg, name}) => {

    const notificationMsg = document.getElementById('notificationMsg');
    notificationMsg.textContent = msg
    notificationMsg.parentElement.classList.add('text-white');
    if (name === 'Error') {
        notificationMsg.parentElement.classList.remove('bg-success');
        notificationMsg.parentElement.classList.add('bg-danger');
    }
    else if (name === 'Info') {
        notificationMsg.parentElement.classList.remove('bg-danger');
        notificationMsg.parentElement.classList.add('bg-success');
    }
    else {
        notificationMsg.parentElement.classList.remove('bg-danger', 'bg-success', 'text-white');
    }
    
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    toast.show();
}

export { notification }