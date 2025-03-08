class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.init();
        
        // Add checkout button listener
        const checkoutBtn = document.querySelector('.shopping-cart .btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.checkout();
            });
        }
    }

    init() {
        // Add event listeners to all add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.addItem(e.target.dataset);
            });
        });

        // Initial render of cart
        this.renderCart();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.renderCart();
        this.showNotification('Item added to cart!');
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.renderCart();
    }

    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(id);
            }
        }
        this.saveCart();
        this.renderCart();
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    renderCart() {
        const cartContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartContainer) {
            cartContainer.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="content">
                        <h3>${item.name}</h3>
                        <div class="price">₹${item.price}/- x ${item.quantity}</div>
                    </div>
                    <div class="quantity-controls">
                        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                    <i class="fas fa-times" onclick="cart.removeItem('${item.id}')"></i>
                </div>
            `).join('');

            cartTotal.textContent = `total : ₹${this.calculateTotal()}/-`;
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    checkout() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }

        if (this.items.length === 0) {
            this.showNotification('Your cart is empty!');
            return;
        }

        // Create new order
        const order = {
            orderId: 'ORD' + Date.now(),
            date: new Date(),
            items: [...this.items],
            total: this.calculateTotal(),
            status: 'Processing',
            userEmail: currentUser.email
        };

        // Get existing orders or initialize empty array
        const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || [];
        
        // Add new order
        orders.unshift(order);
        
        // Save updated orders
        localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders));

        // Clear cart
        this.items = [];
        this.saveCart();
        this.renderCart();

        // Show success message
        this.showNotification('Order placed successfully!');
        
        // Redirect to order history page
        setTimeout(() => {
            window.location.href = 'order-history.html';
        }, 2000);
    }
}

// Initialize cart
const cart = new ShoppingCart(); 