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

    // 2. Interactive Sidebar Category toggle & Slider Logic
    const categoryLinks = document.querySelectorAll('#category-list li');
    const bannerImg = document.getElementById('banner-img');
    const bannerTitle = document.getElementById('banner-title');
    
    // Image data for categories
    const categoriesData = {
        automobiles: {
            title: "Latest trending<br>Automobiles",
            images: [
                "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1503378462227-319bbcb048a1?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
            ]
        },
        clothes: {
            title: "Latest trending<br>Clothes and wear",
            images: [
                "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
            ]
        },
        home: {
            title: "Latest trending<br>Home interiors",
            images: [
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1600607687920-4e2a09be15c7?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
            ]
        },
        tech: {
            title: "Latest trending<br>Computer and tech",
            images: [
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1531297172864-74ea022eb281?auto=format&fit=crop&w=800&q=80"
            ]
        },
        tools: {
            title: "Latest trending<br>Tools & equipments",
            images: [
                "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80"
            ]
        },
        sports: {
            title: "Latest trending<br>Sports & outdoor",
            images: [
                "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=800&q=80"
            ]
        },
        animals: {
            title: "Latest trending<br>Animal & pets",
            images: [
                "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=800&q=80"
            ]
        },
        machinery: {
            title: "Latest trending<br>Machinery tools",
            images: [
                "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1504917595217-d4bfced14f86?auto=format&fit=crop&w=800&q=80"
            ]
        },
        more: {
            title: "Explore<br>More Categories",
            images: [
                "https://picsum.photos/seed/100/800/400",
                "https://picsum.photos/seed/200/800/400",
                "https://picsum.photos/seed/300/800/400"
            ]
        }
    };

    let sliderInterval;
    let currentImageIndex = 0;
    let currentCategory = 'automobiles';

    function updateSlider(categoryId) {
        if (!categoriesData[categoryId]) return;

        const data = categoriesData[categoryId];
        if (bannerTitle) bannerTitle.innerHTML = data.title;
        
        // Reset index and clear interval
        currentImageIndex = 0;
        currentCategory = categoryId;
        if (sliderInterval) clearInterval(sliderInterval);

        // Immediate background change for first image in category
        if (categoryId === 'more') {
            const randomSeed = Math.floor(Math.random() * 1000);
            changeBackgroundImage(`https://picsum.photos/seed/${randomSeed}/800/400`);
        } else {
            changeBackgroundImage(data.images[currentImageIndex]);
        }

        // Start cycling through images for the active category
        sliderInterval = setInterval(() => {
            currentImageIndex++;
            if (categoryId === 'more') {
                const randomSeed = Math.floor(Math.random() * 1000);
                changeBackgroundImage(`https://picsum.photos/seed/${randomSeed}/800/400`);
            } else {
                if (currentImageIndex >= data.images.length) {
                    currentImageIndex = 0;
                }
                changeBackgroundImage(data.images[currentImageIndex]);
            }
        }, 3000); // 3 seconds per slide
    }

    function changeBackgroundImage(url) {
        if (!bannerImg) return;
        bannerImg.style.opacity = '0'; // Start fade out
        setTimeout(() => {
            bannerImg.src = url;
            bannerImg.onload = () => {
                bannerImg.style.opacity = '1'; // Fade back in once loaded
            }
        }, 500); // Wait for fade out to complete before swapping src
    }

    // Initialize the slider immediately for the default category
    updateSlider('automobiles');

    if (categoryLinks) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent jump to top
                
                // Set active class visually
                categoryLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');

                // Trigger slider update
                const categoryId = link.getAttribute('data-id');
                if (categoryId && categoryId !== currentCategory) {
                    updateSlider(categoryId);
                }
            });
        });
    }

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
