document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('user-name').value = currentUser.name;
    document.getElementById('user-email').value = currentUser.email;
}); 