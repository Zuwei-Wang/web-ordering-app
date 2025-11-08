const menuItems = [
    { name: 'Burger', price: 5.99 },
    { name: 'Pizza', price: 7.99 },
    { name: 'Salad', price: 4.99 },
    { name: 'Fries', price: 2.99 }
];

const cart = [];

function renderMenu() {
    const menuList = document.getElementById('menu-items');
    menuItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>${item.name} - £${item.price.toFixed(2)}</span>
            <button class="btn btn-sm btn-success" onclick="addToCart(${index})">Add</button>
        `;
        menuList.appendChild(li);
    });
}

function renderCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item, i) => {
        total += item.price;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>${item.name} - £${item.price.toFixed(2)}</span>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${i})">Remove</button>
        `;
        cartList.appendChild(li);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

function addToCart(index) {
    cart.push(menuItems[index]);
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart.length = 0;
    renderCart();
});

document.addEventListener('DOMContentLoaded', renderMenu);
