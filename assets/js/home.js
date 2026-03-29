/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Dark Mode Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        if(themeBtn) themeBtn.innerText = '☀️ Light Mode';
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            // Update button text and save preference
            if (body.classList.contains('dark-theme')) {
                themeBtn.innerText = '☀️ Light Mode';
                localStorage.setItem('theme', 'dark');
            } else {
                themeBtn.innerText = '🌙 Dark Mode';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 1. Countdown Timer Logic for "Deals and offers" section
    const timerElements = document.querySelectorAll('.time-box .number');
    
    if (timerElements.length === 4) {
        let days = parseInt(timerElements[0].innerText);
        let hours = parseInt(timerElements[1].innerText);
        let mins = parseInt(timerElements[2].innerText);
        let secs = parseInt(timerElements[3].innerText);

        setInterval(() => {
            if (secs > 0) {
                secs--;
            } else {
                secs = 59;
                if (mins > 0) {
                    mins--;
                } else {
                    mins = 59;
                    if (hours > 0) {
                        hours--;
                    } else {
                        hours = 23;
                        if (days > 0) {
                            days--;
                        }
                    }
                }
            }

            // Update DOM with padded zeros
            timerElements[0].innerText = days.toString().padStart(2, '0');
            timerElements[1].innerText = hours.toString().padStart(2, '0');
            timerElements[2].innerText = mins.toString().padStart(2, '0');
            timerElements[3].innerText = secs.toString().padStart(2, '0');
        }, 1000); // Ticks every 1000ms (1 second)
    }

    // 2. Interactive Sidebar Category toggle
    const categoryLinks = document.querySelectorAll('.sidebar-categories li');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link jump
            // Remove 'active' class from all links
            categoryLinks.forEach(item => item.classList.remove('active'));
            // Add 'active' class to the clicked one
            link.classList.add('active');
        });
    });

    // 3. Fake Form Submission for "Send quote to suppliers"
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent browser refresh
            alert('Awesome! Your inquiry has been smoothly sent to the suppliers.');
            quoteForm.reset();  // Clear all form inputs
        });
    }
});
