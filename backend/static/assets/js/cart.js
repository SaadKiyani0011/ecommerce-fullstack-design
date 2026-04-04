/* cart.js — Dynamic cart rendering from CartStore (localStorage) */

document.addEventListener('DOMContentLoaded', () => {

    // ── DOM References ──────────────────────────────────────────
    const container      = document.getElementById('cart-items-container');
    const emptyMsg       = document.getElementById('empty-cart-msg');
    const footerActions  = document.getElementById('cart-footer-actions');
    const sidebar        = document.getElementById('checkout-sidebar');
    const pageTitle      = document.getElementById('cart-page-title');
    const subtotalEl     = document.getElementById('subtotal-val');
    const discountEl     = document.getElementById('discount-val');
    const taxEl          = document.getElementById('tax-val');
    const totalEl        = document.getElementById('total-val');
    const clearBtn       = document.getElementById('clear-cart-btn');
    const checkoutBtn    = document.getElementById('checkout-btn');
    const couponInput    = document.getElementById('coupon-input');
    const couponApplyBtn = document.getElementById('coupon-apply-btn');
    const couponMsg      = document.getElementById('coupon-msg');

    // Simple coupon codes
    const COUPONS = { 'SAVE10': 10, 'DEAL20': 20, 'FIRST50': 50 };
    let appliedDiscount = 0;

    // ── Render Cart ──────────────────────────────────────────────
    function renderCart() {
        const items = CartStore.getAll();
        container.innerHTML = '';

        if (items.length === 0) {
            // Empty cart state
            emptyMsg.style.display      = 'block';
            footerActions.style.display = 'none';
            sidebar.style.display       = 'none';
            pageTitle.textContent       = 'My cart (0)';
            return;
        }

        // Has items
        emptyMsg.style.display      = 'none';
        footerActions.style.display = 'flex';
        sidebar.style.display       = 'block';
        pageTitle.textContent       = `My cart (${CartStore.getCount()})`;

        // Render each item
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.dataset.id      = item.id;
            div.dataset.variant = item.variant;

            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="item-img"
                     onerror="this.src='https://via.placeholder.com/100x100?text=Product'">
                <div class="item-details">
                    <h4 class="item-name">${item.name}</h4>
                    ${item.variant ? `<p class="item-specs">${item.variant}</p>` : ''}
                    <div class="item-actions">
                        <button class="action-btn text-danger remove-item-btn">Remove</button>
                    </div>
                </div>
                <div class="item-price-qty">
                    <span class="price item-line-price">$${(item.price * item.qty).toLocaleString('en-US', {minimumFractionDigits:2})}</span>
                    <div class="quantity-selector">
                        <button class="qty-btn minus">-</button>
                        <input type="number" value="${item.qty}" min="1" max="99" class="qty-input" readonly>
                        <button class="qty-btn plus">+</button>
                    </div>
                    <small style="color:var(--secondary-text); font-size:12px;">$${item.price.toLocaleString()} each</small>
                </div>
            `;

            // Remove button
            div.querySelector('.remove-item-btn').addEventListener('click', () => {
                CartStore.removeItem(item.id, item.variant);
                renderCart();
                updateSummary();
            });

            // Qty minus
            div.querySelector('.qty-btn.minus').addEventListener('click', () => {
                const newQty = item.qty - 1;
                if (newQty < 1) {
                    CartStore.removeItem(item.id, item.variant);
                } else {
                    CartStore.updateQty(item.id, item.variant, newQty);
                }
                renderCart();
                updateSummary();
            });

            // Qty plus
            div.querySelector('.qty-btn.plus').addEventListener('click', () => {
                CartStore.updateQty(item.id, item.variant, item.qty + 1);
                renderCart();
                updateSummary();
            });

            container.appendChild(div);
        });

        updateSummary();
    }

    // ── Update Order Summary ─────────────────────────────────────
    function updateSummary() {
        const subtotal = CartStore.getSubtotal();
        const discount = (subtotal * appliedDiscount) / 100;
        const tax      = (subtotal - discount) * 0.05;
        const total    = subtotal - discount + tax;

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('en-US', {minimumFractionDigits:2})}`;
        if (discountEl) discountEl.textContent = `- $${discount.toLocaleString('en-US', {minimumFractionDigits:2})}`;
        if (taxEl)      taxEl.textContent      = `+ $${tax.toLocaleString('en-US', {minimumFractionDigits:2})}`;
        if (totalEl)    totalEl.textContent    = `$${total.toLocaleString('en-US', {minimumFractionDigits:2})}`;
    }

    // ── Clear All Items ──────────────────────────────────────────
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to remove all items from your cart?')) {
                CartStore.clear();
                appliedDiscount = 0;
                renderCart();
            }
        });
    }

    // ── Coupon Code ──────────────────────────────────────────────
    if (couponApplyBtn) {
        couponApplyBtn.addEventListener('click', () => {
            const code = couponInput.value.trim().toUpperCase();
            if (COUPONS[code]) {
                appliedDiscount = COUPONS[code];
                couponMsg.textContent = `✅ Coupon "${code}" applied! ${appliedDiscount}% off.`;
                couponMsg.style.color = '#16a34a';
                couponInput.disabled  = true;
                couponApplyBtn.disabled = true;
                couponApplyBtn.textContent = 'Applied ✓';
                updateSummary();
            } else {
                couponMsg.textContent = '❌ Invalid coupon code. Try: SAVE10, DEAL20, FIRST50';
                couponMsg.style.color = '#ef4444';
            }
        });
    }

    // ── Checkout Button ──────────────────────────────────────────
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (CartStore.getCount() === 0) return;
            alert('🎉 Order placed successfully! Thank you for shopping with us.');
            CartStore.clear();
            appliedDiscount = 0;
            renderCart();
        });
    }

    // ── Initial Render ───────────────────────────────────────────
    renderCart();
});
