/* details.js */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Thumbnail Image Swap
    const mainImg = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumb');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Swap source
            if(mainImg) mainImg.src = this.src;
            
            // Manage active class
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Quantity Selector
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');

    if(minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value) || 1;
            if(currentValue > 1) qtyInput.value = currentValue - 1;
        });

        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value) || 1;
            qtyInput.value = currentValue + 1;
        });
    }

    // 3. Selection Buttons (Color, Type)
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    const typeBtns = document.querySelectorAll('.type-btn');
    typeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            typeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 4. Tabs in Description Section
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Usually you would swap out the .tab-content here depending on the button clicked.
            // For now, we simulate the interaction by visually highlighting the tab.
        });
    });
});
