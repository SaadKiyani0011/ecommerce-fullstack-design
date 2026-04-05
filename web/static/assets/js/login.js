// Login and Sign Up sliding transitions logic
document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }

    // ==== MOCK AUTHENTICATION LOGIC ====
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');

    if (signUpForm) {
        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const msg = document.getElementById('signup-msg');

            if (!name || !email) {
                msg.textContent = 'Please fill out all required fields.';
                msg.style.color = '#ef4444';
                return;
            }

            // Save basic user info temporarily structure in localStorage
            const user = { name: name, email: email };
            localStorage.setItem('ecommerce_user', JSON.stringify(user));
            
            msg.textContent = 'Account created successfully! Redirecting...';
            msg.style.color = '#16a34a';

            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        });
    }

    if (signInForm) {
        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value.trim();
            const msg = document.getElementById('signin-msg');

            if (!email) {
                msg.textContent = 'Please enter your email.';
                msg.style.color = '#ef4444';
                return;
            }

            // Mock Extract Name from Email ("john.doe@gmail.com" -> "John Doe")
            const namePart = email.split('@')[0];
            const fakeName = namePart.split(/[\.\-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            const user = { name: fakeName, email: email };
            localStorage.setItem('ecommerce_user', JSON.stringify(user));

            msg.textContent = 'Login successful! Redirecting...';
            msg.style.color = '#16a34a';

            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        });
    }
});
