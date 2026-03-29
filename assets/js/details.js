const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch data
    let product;
    if (productId) {
        product = getProductById(productId); // From db.js
    }

    if (!product) {
        // Fallback default if navigating without ID directly to details.html
        product = getProductById(101); // Load iPhone by default
    }

    if (product) {
        document.getElementById('bc-category').textContent = productDatabase[product.category].title;
        document.getElementById('bc-title').textContent = product.name;
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-rating').textContent = product.rating;
        document.getElementById('product-reviews').textContent = `(${product.reviews} reviews)`;
        document.getElementById('product-price').textContent = `$${product.price.toLocaleString()}`;
        document.getElementById('product-old-price').textContent = `$${(product.price * 1.2).toLocaleString()}`; // Fake old price 20% higher
        document.getElementById('product-desc').textContent = product.description;
        document.getElementById('full-description').textContent = product.description + " This product represents high-quality e-commerce standards with robust durability and fantastic customer service.";
        
        // 2. Load Gallery
        const mainImg = document.getElementById('main-img');
        const thumbsContainer = document.getElementById('thumbnail-row');
        
        // Ensure main image
        mainImg.src = product.img;

        // Render thumbnails
        if(product.gallery && product.gallery.length > 0) {
            product.gallery.forEach((url, index) => {
                const thumb = document.createElement('img');
                thumb.src = url;
                thumb.className = `thumb-img ${index === 0 ? 'active' : ''}`;
                // Gallery click logic
                thumb.addEventListener('click', () => {
                    // Update main picture
                    mainImg.src = url;
                    // Update active border
                    document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                thumbsContainer.appendChild(thumb);
            });
        }

        // 3. Load Variants (Colors)
        const colorsContainer = document.getElementById('color-options');
        if (product.variants && product.variants.colors) {
            product.variants.colors.forEach((color, index) => {
                const swatch = document.createElement('div');
                swatch.className = `color-swatch ${index === 0 ? 'active' : ''}`;
                swatch.style.backgroundColor = color;
                swatch.addEventListener('click', () => {
                    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');
                });
                colorsContainer.appendChild(swatch);
            });
        }

        // 4. Load Variants (Sizes)
        const sizesContainer = document.getElementById('size-options');
        if (product.variants && product.variants.sizes) {
            product.variants.sizes.forEach((size, index) => {
                const sizeBtn = document.createElement('button');
                sizeBtn.className = `size-btn ${index === 0 ? 'active' : ''}`;
                sizeBtn.textContent = size;
                sizeBtn.addEventListener('click', () => {
                    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    sizeBtn.classList.add('active');
                });
                sizesContainer.appendChild(sizeBtn);
            });
        }
    } else {
        document.getElementById('main-content').innerHTML = `<h1>Product not found.</h1><a href="listing.html">Go Back</a>`;
    }

    // Interactive Quantity Selector Setup
    const qtyInput = document.getElementById('qty-input');
    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');

    if(minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) { qtyInput.value = val - 1; }
        });
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val < 10) { qtyInput.value = val + 1; } // Fake max stock 10
        });
    }

    // Basic Add to Cart interaction demo
    const addCartBtn = document.getElementById('add-cart');
    if(addCartBtn) {
        addCartBtn.addEventListener('click', () => {
            const originalText = addCartBtn.textContent;
            addCartBtn.textContent = "Added to Cart ✓";
            addCartBtn.style.background = "#16a34a"; // Green
            setTimeout(() => {
                addCartBtn.textContent = originalText;
                addCartBtn.style.background = ""; // Restore via CSS override reset
            }, 2000);
        });
    }

    // Theme logic hook (mirroring home behavior)
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        });
    }
});
