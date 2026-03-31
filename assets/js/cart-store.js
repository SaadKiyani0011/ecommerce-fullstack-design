// cart-store.js
// Shared Cart Manager — works across all pages via localStorage
// Cart item structure: { id, name, price, img, qty, variant }

const CartStore = {
    STORAGE_KEY: 'ecommerce_cart',

    // Get all cart items
    getAll() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch(e) {
            return [];
        }
    },

    // Save items to localStorage
    _save(items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    },

    // Add a product (or increase qty if already in cart)
    addItem(product, qty = 1, variant = '') {
        const items = this.getAll();
        const existing = items.find(i => i.id === product.id && i.variant === variant);
        if (existing) {
            existing.qty += qty;
        } else {
            items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                qty: qty,
                variant: variant
            });
        }
        this._save(items);
        this.updateBadge();
    },

    // Remove a product from cart
    removeItem(id, variant = '') {
        let items = this.getAll();
        items = items.filter(i => !(i.id === id && i.variant === variant));
        this._save(items);
        this.updateBadge();
    },

    // Update quantity of a cart item
    updateQty(id, variant = '', newQty) {
        const items = this.getAll();
        const item = items.find(i => i.id === id && i.variant === variant);
        if (item) {
            item.qty = Math.max(1, parseInt(newQty) || 1);
        }
        this._save(items);
        this.updateBadge();
    },

    // Total item count (sum of all quantities)
    getCount() {
        return this.getAll().reduce((sum, item) => sum + item.qty, 0);
    },

    // Subtotal price
    getSubtotal() {
        return this.getAll().reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    // Clear entire cart
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateBadge();
    },

    // Update cart count badge in header on any page
    updateBadge() {
        const badge = document.getElementById('cart-count-badge');
        if (badge) {
            const count = this.getCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};

// ==== GLOBAL AUTHENTICATION UI UPDATE ====
document.addEventListener('DOMContentLoaded', () => {
    try {
        const userData = localStorage.getItem('ecommerce_user');
        if (userData) {
            const user = JSON.parse(userData);
            // Find the Profile label across any page
            const actionItems = document.querySelectorAll('.action-item');
            actionItems.forEach(item => {
                const icon = item.querySelector('.icon');
                const label = item.querySelector('.label');
                if (icon && icon.textContent.includes('👤') && label) {
                    // Change Profile -> Hi, FirstName
                    label.textContent = `Hi, ${user.name.split(' ')[0]}`;
                    
                    // Modify click to act as a logout
                    item.href = "#";
                    // Using a wrapper to avoid interfering with previously bound events
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (confirm(`Logged in as ${user.email}.\nDo you want to log out?`)) {
                            localStorage.removeItem('ecommerce_user');
                            window.location.reload();
                        }
                    });
                }
            });
        }
    } catch (e) { console.error("Auth check failed:", e); }
});
