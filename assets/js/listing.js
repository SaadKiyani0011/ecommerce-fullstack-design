/* listing.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Grid/List View Toggle
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productGrid = document.querySelector('.product-grid');

    if (gridViewBtn && listViewBtn && productGrid) {
        gridViewBtn.addEventListener('click', () => {
            productGrid.classList.remove('list-view-mode');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });

        listViewBtn.addEventListener('click', () => {
            productGrid.classList.add('list-view-mode');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
    }

    // 2. Favorite Heart Toggle
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('liked');
            if(this.classList.contains('liked')) {
                this.innerHTML = '♥';
            } else {
                this.innerHTML = '♡';
            }
        });
    });

    // 3. Clear All Filters
    const clearBtn = document.querySelector('.clear-all-btn');
    const activeFilters = document.querySelector('.active-filters');
    if (clearBtn && activeFilters) {
        clearBtn.addEventListener('click', () => {
            // Uncheck all checkboxes
            document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
            // Uncheck all radios
            document.querySelectorAll('.filter-sidebar input[type="radio"]').forEach(rb => rb.checked = false);
            // Hide the active filter tags area
            activeFilters.style.display = 'none';
        });
    }

    // 4. Remove Individual Filter Tag
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.display = 'none';
        });
    });
});
