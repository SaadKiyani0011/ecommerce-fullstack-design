const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    // Update cart badge on page load
    if (typeof CartStore !== 'undefined') CartStore.updateBadge();

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

    // Real Add to Cart with quantity and variant
    const addCartBtn = document.getElementById('add-cart');
    const qtyInputEl = document.getElementById('qty-input');
    if (addCartBtn && product) {
        addCartBtn.addEventListener('click', () => {
            const qty = parseInt(qtyInputEl ? qtyInputEl.value : 1) || 1;

            // Get selected color and size
            const activeColor = document.querySelector('.color-swatch.active');
            const activeSize  = document.querySelector('.size-btn.active');
            const colorVal    = activeColor ? activeColor.style.backgroundColor : '';
            const sizeVal     = activeSize  ? activeSize.textContent : '';
            const variant     = [sizeVal, colorVal].filter(Boolean).join(' / ');

            CartStore.addItem(product, qty, variant);

            // Visual feedback
            const originalText = addCartBtn.textContent;
            addCartBtn.textContent = `✓ Added to Cart (${qty})`;
            addCartBtn.style.background = '#16a34a';
            setTimeout(() => {
                addCartBtn.textContent = originalText;
                addCartBtn.style.background = '';
            }, 2000);
        });
    }

    // Theme: Apply saved preference from localStorage on page load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Theme logic hook (mirroring home behavior)
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
