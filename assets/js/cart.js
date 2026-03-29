/* cart.js */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Remove individual items from cart
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Traverse up to find the closest .cart-item and remove it
            const cartItem = this.closest('.cart-item');
            if (cartItem) {
                cartItem.style.display = 'none'; // Simply hide to simulate removal
                updateTotals(); // Recalculate summary
            }
        });
    });

    // 2. Clear entirely cart
    const removeAllBtn = document.querySelector('.remove-all-btn');
    if (removeAllBtn) {
        removeAllBtn.addEventListener('click', () => {
            const allItems = document.querySelectorAll('.cart-item');
            allItems.forEach(item => item.style.display = 'none');
            updateTotals(); // Recalculate summary
        });
    }

    // 3. Move from Saved to Cart (Fake Interaction)
    const moveCartBtns = document.querySelectorAll('.move-cart-btn');
    moveCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.parentElement.querySelector('.title').innerText;
            alert(`${title} was smoothly moved back into your active cart!`);
        });
    });

    // 4. Quantity Adjustments (Updates total)
    const minusBtns = document.querySelectorAll('.qty-btn.minus');
    const plusBtns = document.querySelectorAll('.qty-btn.plus');

    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.qty-input');
            let currentValue = parseInt(input.value) || 1;
            if(currentValue > 1) {
                input.value = currentValue - 1;
                updateTotals();
            }
        });
    });

    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.qty-input');
            let currentValue = parseInt(input.value) || 1;
            input.value = currentValue + 1;
            updateTotals();
        });
    });

    // Dummy Calculation Update function when quantities change or items are removed
    function updateTotals() {
        const subtotalEl = document.querySelector('.subtotal-val');
        const taxEl = document.querySelector('.tax-val');
        const totalEl = document.querySelector('.total-val');
        const pageTitle = document.querySelector('.page-title');
        
        // This is a dummy update animation effect
        if(totalEl && subtotalEl && taxEl) {
            subtotalEl.innerText = 'Calculating...';
            taxEl.innerText = 'Calculating...';
            totalEl.innerText = 'Calculating...';
            if(pageTitle) pageTitle.innerText = "My cart (Updating...)";
            
            setTimeout(() => {
                subtotalEl.innerText = '$' + (Math.random() * 2000 + 500).toFixed(2);
                taxEl.innerText = '+ $14.00';
                totalEl.innerText = '$' + (Math.random() * 2000 + 500).toFixed(2);
                if(pageTitle) pageTitle.innerText = "My cart";
            }, 500);
        }
    }
});
