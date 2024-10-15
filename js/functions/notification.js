const notification = (msg) => {
    document.getElementById('notificationMsg').textContent = msg;
    const toast = new bootstrap.Toast(document.getElementById('toast'))
    toast.show();
}

export { notification }