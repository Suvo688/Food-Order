document.addEventListener('DOMContentLoaded', function() {
    const noOrdersElement = document.getElementById('no-orders');
    const ordersListElement = document.getElementById('orders-list');
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || [];

    if (orders.length === 0) {
        // Show no orders message
        noOrdersElement.style.display = 'block';
        ordersListElement.style.display = 'none';
    } else {
        // Hide no orders message and show orders
        noOrdersElement.style.display = 'none';
        ordersListElement.style.display = 'block';
        
        // Display orders
        displayOrders(orders);
    }
});

function displayOrders(orders) {
    const ordersListElement = document.getElementById('orders-list');
    
    ordersListElement.innerHTML = orders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <div>
                    <div class="order-number">Order #${order.orderId}</div>
                    <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
                </div>
                <div class="order-status ${order.status === 'Delivered' ? 'status-delivered' : 'status-processing'}">
                    ${order.status}
                </div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item-row">
                        <img src="${item.image}" alt="${item.name}" class="order-item-image">
                        <div class="order-item-details">
                            <h3>${item.name}</h3>
                            <p>Quantity: ${item.quantity} × ₹${item.price}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                Total: ₹${order.total}/-
            </div>
        </div>
    `).join('');
} 