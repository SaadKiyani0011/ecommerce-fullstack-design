// Central Data Store representing a mock Backend Database
const productDatabase = {
    electronics: {
        title: "Electronics & Tech",
        brands: ["Apple", "Samsung", "Sony", "Dell"],
        features: ["8GB RAM", "16GB RAM", "1TB SSD", "5G Ready"],
        products: [
            { id: 101, name: "iPhone 15 Pro Max 256GB Platinum Edition", price: 1199, rating: 4.8, reviews: 142, img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400" },
            { id: 102, name: "Samsung Galaxy S24 Ultra", price: 1099, rating: 4.7, reviews: 98, img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400" },
            { id: 103, name: "Sony WH-1000XM5 Noise Cancelling", price: 349, rating: 4.9, reviews: 312, img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400" },
            { id: 104, name: "Dell XPS 13 Ultra-Thin Laptop", price: 1250, rating: 4.6, reviews: 85, img: "https://images.unsplash.com/photo-1593642702821-c823b13eb295?q=80&w=400" },
            { id: 105, name: "Apple MacBook Pro M3 Chip", price: 1599, rating: 4.9, reviews: 204, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400" },
            { id: 106, name: "Sony PlayStation 5 Console", price: 499, rating: 4.8, reviews: 1020, img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400" }
        ]
    },
    automobile: {
        title: "Automobiles & Parts",
        brands: ["Toyota", "Honda", "BMW", "Ford", "Tesla"],
        features: ["Automatic", "Manual", "Hybrid", "Electric", "V8 Engine"],
        products: [
            { id: 201, name: "Honda Civic Sedan 2024", price: 25000, rating: 4.6, reviews: 120, img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400" },
            { id: 202, name: "BMW M3 Competition", price: 74000, rating: 4.9, reviews: 45, img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=400" },
            { id: 203, name: "Ford Mustang GT Fastback", price: 55000, rating: 4.7, reviews: 89, img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=400" },
            { id: 204, name: "Toyota Camry SE XLE Hybrid", price: 28000, rating: 4.5, reviews: 230, img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?q=80&w=400" },
            { id: 205, name: "Tesla Model 3 Dual Motor", price: 42000, rating: 4.8, reviews: 412, img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=400" }
        ]
    },
    clothing: {
         title: "Clothing & Fashion",
        brands: ["Nike", "Adidas", "Gucci", "Zara", "H&M"],
        features: ["Cotton", "Polyester", "Running", "Formal", "Casual"],
        products: [
            { id: 301, name: "Nike Air Max 270 Sneakers", price: 129, rating: 4.7, reviews: 852, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400" },
            { id: 302, name: "Adidas Ultraboost Light Running", price: 155, rating: 4.8, reviews: 410, img: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=400" },
            { id: 303, name: "Zara Minimalist Long Coat", price: 89, rating: 4.4, reviews: 112, img: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=400" },
            { id: 304, name: "Gucci Premium Leather Bag", price: 1250, rating: 4.9, reviews: 63, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400" }
        ]
    },
     home: {
        title: "Home Interiors",
        brands: ["IKEA", "HomeSense", "Pottery Barn"],
        features: ["Wood Material", "Stainless Metal", "Modern Design", "Classic Vintage"],
        products: [
            { id: 401, name: "Modern Minimalist Velvet Sofa", price: 450, rating: 4.6, reviews: 89, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400" },
            { id: 402, name: "Solid Wooden Oak Dining Table", price: 299, rating: 4.8, reviews: 45, img: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=400" },
            { id: 403, name: "Ergonomic Lounge Armchair", price: 185, rating: 4.7, reviews: 126, img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=400" },
            { id: 404, name: "Ceramic Bedside Table Lamp", price: 45, rating: 4.3, reviews: 29, img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=400" },
            { id: 405, name: "Abstract Canvas Wall Art 24x36", price: 110, rating: 4.9, reviews: 71, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400" }
        ]
    }
};

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
