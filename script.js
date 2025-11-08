const menuItems = [
  { name: "Item 1", price: 10 },
  { name: "Item 2", price: 15 },
  { name: "Item 3", price: 8 }
];

const cart = [];

function renderMenu() {
  const menuList = document.getElementById("menu-list");
  menuList.innerHTML = "";
  menuItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${item.name} - £${item.price.toFixed(2)}</span>
      <button class="btn btn-sm btn-primary" data-index="${index}">添加</button>
    `;
    menuList.appendChild(li);
  });
  menuList.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", e => {
      const idx = parseInt(e.target.getAttribute("data-index"));
      addToCart(menuItems[idx]);
    });
  });
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${item.name} x ${item.quantity} - £${(item.price * item.quantity).toFixed(2)}</span>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-1" data-action="decrease" data-index="${index}">-</button>
        <button class="btn btn-sm btn-outline-secondary me-1" data-action="increase" data-index="${index}">+</button>
        <button class="btn btn-sm btn-danger" data-action="remove" data-index="${index}">删除</button>
      </div>
    `;
    cartList.appendChild(li);
  });
  document.getElementById("cart-total").textContent = total.toFixed(2);

  cartList.querySelectorAll("button").forEach(button => {
    const action = button.getAttribute("data-action");
    const idx = parseInt(button.getAttribute("data-index"));
    button.addEventListener("click", () => {
      if (action === "increase") {
        increaseQuantity(idx);
      } else if (action === "decrease") {
        decreaseQuantity(idx);
      } else if (action === "remove") {
        removeFromCart(idx);
      }
    });
  });
}

function addToCart(item) {
  const existing = cart.find(cartItem => cartItem.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  renderCart();
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  renderCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("购物车为空！");
    } else {
      alert("谢谢你的购买！");
      cart.length = 0;
      renderCart();
    }
  });
});
