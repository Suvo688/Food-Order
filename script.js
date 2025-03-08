let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});

var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});

// Cart functionality
let cart = [];
let cartTotal = 0;

function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
    updateCartTotal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartTotal();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'box';
        cartItem.innerHTML = `
            <i class="fas fa-trash" onclick="removeFromCart(${index})"></i>
            <img src="${item.image}" alt="">
            <div class="content">
                <h3>${item.name}</h3>
                <span class="price">&#8377 ${item.price}/-</span>
                <span class="quantity">qty : 1</span>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
}

function updateCartTotal() {
    cartTotal = cart.reduce((total, item) => total + Number(item.price), 0);
    document.getElementById('cart-total').innerHTML = `total : &#8377 ${cartTotal}/-`;
}

// Add event listeners to all "add to cart" buttons
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const item = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: this.dataset.price,
                image: this.dataset.image
            };
            addToCart(item);
        });
    });
});

// Product database
const products = [
    {
        id: 1,
        name: "fresh orange",
        price: 25,
        image: "image/product-1.png",
        description: "Fresh and juicy oranges"
    },
    {
        id: 2,
        name: "fresh onion",
        price: 35,
        image: "image/product-2.png",
        description: "Fresh organic onions"
    },
    {
        id: 3,
        name: "fresh meat",
        price: 185,
        image: "image/product-3.png",
        description: "Premium quality meat"
    },
    {
        id: 4,
        name: "fresh cabbage",
        price: 45,
        image: "image/product-4.png",
        description: "Crispy fresh cabbage"
    },
    {
        id: 5,
        name: "fresh potato",
        price: 70,
        image: "image/product-5.png",
        description: "Fresh farm potatoes"
    },
    {
        id: 6,
        name: "fresh avocado",
        price: 95,
        image: "image/product-6.png",
        description: "Ripe avocados"
    },
    {
        id: 7,
        name: "fresh carrot",
        price: 85,
        image: "image/product-7.png",
        description: "Fresh organic carrots"
    },
    {
        id: 8,
        name: "green lemon",
        price: 50,
        image: "image/product-8.png",
        description: "Fresh green lemons"
    }
];

// Search functionality
const searchBox = document.querySelector('#search-box');
const searchResults = document.querySelector('#search-results');

searchBox.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    if (searchTerm.length > 0) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(filteredProducts);
        searchResults.classList.add('active');
    } else {
        searchResults.classList.remove('active');
    }
});

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p style="text-align: center; padding: 1rem;">No products found</p>';
        return;
    }
    
    results.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'box';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="content">
                <h3>${product.name}</h3>
                <div class="price">&#8377; ${product.price}/-</div>
                <p>${product.description}</p>
                <a href="#" class="btn add-to-cart" 
                   data-id="${product.id}" 
                   data-name="${product.name}" 
                   data-price="${product.price}" 
                   data-image="${product.image}">
                   add to cart
                </a>
            </div>
        `;
        searchResults.appendChild(productElement);
    });

    // Add click handlers for the new "add to cart" buttons
    searchResults.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const item = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: this.dataset.price,
                image: this.dataset.image
            };
            addToCart(item);
            // Optional: Show a confirmation message
            alert(`${item.name} added to cart!`);
        });
    });
}

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    if (!searchBox.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});

let settingsBtn = document.querySelector('#settings-btn');
let settingsMenu = document.querySelector('.settings-menu');

// Check if user is logged in
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.body.classList.add('logged-in');
        return true;
    }
    document.body.classList.remove('logged-in');
    return false;
}

// Toggle settings menu
settingsBtn.onclick = () => {
    settingsMenu.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

// Handle logout
document.querySelector('#logout-btn').onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
}

// Check login status when page loads
window.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});

// Close settings menu when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsBtn.contains(e.target) && !settingsMenu.contains(e.target)) {
        settingsMenu.classList.remove('active');
    }
});