document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            try {
                // Here you would typically make an API call to your backend
                // For now, we'll use localStorage as a simple example
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = 'index.html';
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = registerForm.querySelector('input[type="text"]').value;
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelectorAll('input[type="password"]')[0].value;
            const confirmPassword = registerForm.querySelectorAll('input[type="password"]')[1].value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                // Here you would typically make an API call to your backend
                // For now, we'll use localStorage as a simple example
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                if (users.some(u => u.email === email)) {
                    alert('Email already registered');
                    return;
                }

                users.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                
                alert('Registration successful!');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed');
            }
        });
    }
}); 