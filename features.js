document.addEventListener('DOMContentLoaded', function() {
    // Handle tracking form submission
    const trackingForm = document.querySelector('.tracking-form');
    if (trackingForm) {
        trackingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const orderId = trackingForm.querySelector('input').value;
            // Add your tracking logic here
            alert(`Tracking order: ${orderId}`);
        });
    }

    // Load featured products if on organic page
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        loadFeaturedProducts();
    }
});

function loadFeaturedProducts() {
    // Add your product loading logic here
    const products = [
        {
            name: 'Organic Tomatoes',
            price: 40,
            image: 'image/vegetables/tomatoes.jpg'
        },
        // Add more products
    ];

    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">₹${product.price}/-</div>
            <a href="#" class="btn add-to-cart">Add to Cart</a>
        </div>
    `).join('');
} 