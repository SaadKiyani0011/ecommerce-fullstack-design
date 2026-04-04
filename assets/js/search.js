// search.js
// Handles search bar functionality across all pages

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const categorySelect = document.querySelector('.category-select');

    // Make the search trigger a redirection to listing.html with url parameters
    function performSearch() {
        if (!searchInput) return;
        
        const query = searchInput.value.trim();
        const category = categorySelect ? categorySelect.value : 'all';

        if (query) {
            // Encode parameters to handle spaces and special characters
            window.location.href = `listing.html?q=${encodeURIComponent(query)}&cat=${encodeURIComponent(category)}`;
        } else {
            // If empty search, maybe just go to listing
            if (category !== 'all') {
                window.location.href = `listing.html?cat=${encodeURIComponent(category)}`;
            } else {
                window.location.href = 'listing.html';
            }
        }
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        
        // Also trigger search on Enter key press
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        // Pre-fill the search input and category if we are on listing page and have URL params
        const urlParams = new URL(window.location.href).searchParams;
        const q = urlParams.get('q');
        const cat = urlParams.get('cat');
        
        if (q) searchInput.value = q;
        if (cat && categorySelect) {
            // Try to select if option exists
            Array.from(categorySelect.options).forEach(opt => {
                if(opt.value === cat || opt.value.toLowerCase() === cat.toLowerCase()) {
                    opt.selected = true;
                }
            });
        }
    }
});
