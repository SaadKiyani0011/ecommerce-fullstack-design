

// DOM Elements
const filterBrandsContainer = document.getElementById('filter-brands');
const filterFeaturesContainer = document.getElementById('filter-features');
const productGrid = document.getElementById('product-grid');
const breadcrumbCategory = document.getElementById('breadcrumb-category');
const resultsCount = document.getElementById('results-count');
const categoryTabs = document.querySelectorAll('.cat-btn');

// Render Functions
function renderSidebarFilters(categoryKey) {
    const data = productDatabase[categoryKey];
    
    // Render Brands
    filterBrandsContainer.innerHTML = '';
    data.brands.forEach(brand => {
        const label = document.createElement('label');
        label.className = 'custom-checkbox';
        label.innerHTML = `<input type="checkbox" value="${brand}"> <span>${brand}</span>`;
        filterBrandsContainer.appendChild(label);
    });

    // Render Features
    filterFeaturesContainer.innerHTML = '';
    data.features.forEach(feature => {
        const label = document.createElement('label');
        label.className = 'custom-checkbox';
        label.innerHTML = `<input type="checkbox" value="${feature}"> <span>${feature}</span>`;
        filterFeaturesContainer.appendChild(label);
    });
}

function renderProducts(categoryKey, searchQuery = null) {
    let productsToRender = [];
    let titleToRender = "";
    
    // 1. Filter by category
    if (categoryKey && categoryKey !== 'all' && productDatabase[categoryKey]) {
        productsToRender = productDatabase[categoryKey].products;
        titleToRender = productDatabase[categoryKey].title;
    } else {
        for (const key in productDatabase) {
            productsToRender = productsToRender.concat(productDatabase[key].products);
        }
        titleToRender = "All Products";
    }

    // 2. Filter by search query
    if (searchQuery) {
        const lowerQ = searchQuery.toLowerCase();
        productsToRender = productsToRender.filter(p => 
            p.name.toLowerCase().includes(lowerQ) || 
            p.description.toLowerCase().includes(lowerQ)
        );
        titleToRender = `Search results for "${searchQuery}"`;
    }

    // Update breadcrumb visually
    if (breadcrumbCategory) breadcrumbCategory.textContent = titleToRender;

    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        resultsCount.textContent = `0 items found`;
        productGrid.innerHTML = `<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--secondary-text);">No products found matching your search.</div>`;
        return;
    }

    resultsCount.textContent = `${productsToRender.length} items found`;

    productsToRender.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${prod.img}" alt="${prod.name}">
                <button class="add-cart-btn">Add to Cart</button>
            </div>
            <div class="product-info">
                <a href="details.html?id=${prod.id}" class="product-title">${prod.name}</a>
                <div class="product-rating">
                    ★★★★★ <span>${prod.rating} (${prod.reviews})</span>
                </div>
                <div class="product-price">$${prod.price.toLocaleString()}</div>
            </div>
        `;

        // Wire up Add to Cart button
        const addBtn = card.querySelector('.add-cart-btn');
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            CartStore.addItem(prod, 1);
            addBtn.textContent = 'Added ✓';
            addBtn.style.background = '#16a34a';
            setTimeout(() => {
                addBtn.textContent = 'Add to Cart';
                addBtn.style.background = '';
            }, 1500);
        });

        productGrid.appendChild(card);
    });
}

function loadCategory(categoryKey, searchQuery = null) {
    if (categoryKey !== 'all' && !productDatabase[categoryKey]) return;
    
    if (categoryKey !== 'all') {
        renderSidebarFilters(categoryKey);
    } else {
        filterBrandsContainer.innerHTML = '<div style="color:var(--secondary-text); font-size:13px;">Showing all brands</div>';
        filterFeaturesContainer.innerHTML = '<div style="color:var(--secondary-text); font-size:13px;">Showing all features</div>';
    }
    
    renderProducts(categoryKey, searchQuery);
}

// Initialization and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Update cart badge on page load
    if (typeof CartStore !== 'undefined') CartStore.updateBadge();

    // Determine active category from tabs or default to electronics
    let initialCat = 'electronics';
    let searchQuery = null;

    // Check URL parameters for search
    if (window.location.search) {
        const urlParams = new URL(window.location.href).searchParams;
        searchQuery = urlParams.get('q') || null;
        if (urlParams.get('cat')) {
            initialCat = urlParams.get('cat');
        }
    } else {
        const activeTab = document.querySelector('.cat-btn.active');
        if (activeTab) initialCat = activeTab.dataset.cat;
    }

    // Set correct active tab based on determined category
    categoryTabs.forEach(t => t.classList.remove('active'));
    if (initialCat !== 'all') {
        const targetTab = document.querySelector(`.cat-btn[data-cat="${initialCat}"]`);
        if (targetTab) targetTab.classList.add('active');
    }
    
    loadCategory(initialCat, searchQuery);

    // Tab clicks
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Remove active class from all
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            
            // Load new category
            loadCategory(e.target.dataset.cat);
        });
    });

    // Theme: Apply saved preference from localStorage on page load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Handle Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Update button text based on current state
        themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️ Light Mode' : '🌙 Dark Mode';

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Newsletter Subscribe Button
    const newsletterBtn = document.getElementById('newsletter-btn');
    const newsletterEmail = document.getElementById('newsletter-email');
    if (newsletterBtn && newsletterEmail) {
        newsletterBtn.addEventListener('click', () => {
            const email = newsletterEmail.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const existing = document.getElementById('newsletter-feedback');
            if (existing) existing.remove();
            const feedback = document.createElement('p');
            feedback.id = 'newsletter-feedback';
            feedback.style.cssText = 'margin-top: 8px; font-size: 13px; font-weight: 500;';
            if (!email) {
                feedback.textContent = '⚠️ Please enter your email address.';
                feedback.style.color = '#ff9800';
            } else if (!emailRegex.test(email)) {
                feedback.textContent = '⚠️ Please enter a valid email address.';
                feedback.style.color = '#ff9800';
            } else {
                feedback.textContent = '✅ Thank you! You have successfully subscribed.';
                feedback.style.color = '#4ade80';
                newsletterEmail.value = '';
                newsletterBtn.textContent = 'Subscribed ✓';
                newsletterBtn.disabled = true;
                newsletterBtn.style.opacity = '0.7';
                setTimeout(() => {
                    newsletterBtn.textContent = 'Subscribe';
                    newsletterBtn.disabled = false;
                    newsletterBtn.style.opacity = '';
                    if (feedback.parentNode) feedback.remove();
                }, 4000);
            }
            newsletterEmail.parentElement.appendChild(feedback);
        });
    }
});
