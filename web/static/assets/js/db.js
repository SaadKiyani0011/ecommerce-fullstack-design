// Real Dynamic Database fetching from Django
let productDatabase = {};

// Helper to find a product by ID
function getProductById(id) {
    const targetId = parseInt(id);
    for (const catKey in productDatabase) {
        const cat = productDatabase[catKey];
        if (cat.products) {
            const found = cat.products.find(p => p.id === targetId);
            if (found) return found;
        }
    }
    return null;
}

// Function to fetch products from the backend API
async function fetchProductDatabase() {
    try {
        const response = await fetch('/listing/api/products/');
        if (!response.ok) throw new Error('Network response was not ok');
        productDatabase = await response.json();
        return productDatabase;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to empty if failed
        return {};
    }
}
