

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

function renderProducts(categoryKey) {
    const data = productDatabase[categoryKey];
    productGrid.innerHTML = '';
    resultsCount.textContent = `${data.products.length} items found`;

    data.products.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        // Enclose title inside an anchor tag that points to details.html WITH ID
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
        productGrid.appendChild(card);
    });
}

function loadCategory(categoryKey) {
    if(!productDatabase[categoryKey]) return;
    
    // Update breadcrumb
    breadcrumbCategory.textContent = productDatabase[categoryKey].title;
    
    // Render
    renderSidebarFilters(categoryKey);
    renderProducts(categoryKey);
}

// Initialization and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Determine active category from tabs or default to electronics
    const activeTab = document.querySelector('.cat-btn.active');
    const defaultCat = activeTab ? activeTab.dataset.cat : 'electronics';
    
    loadCategory(defaultCat);

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

    // Handle Theme specific logic if included from home.js equivalent
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }
});
