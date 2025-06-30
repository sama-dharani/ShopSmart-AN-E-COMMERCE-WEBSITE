// For category display (Clothes, Grocery, Food pages)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof products !== "undefined" && products.length > 0) {
    const container = document.getElementById("categories");
    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.innerHTML = `
        <div class="product-card p-3">
          <img src="${product.img}" alt="${product.name}" class="img-fluid" />
          <h5>${product.name}</h5>
          <p>Price: ₹${product.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${index})">Add to Cart</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  displayCart();
});

// Store cart in localStorage
function addToCart(index) {
  const selectedProduct = products[index];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(selectedProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${selectedProduct.name} added to cart!`);
}

// Display cart items on cart.html
function displayCart() {
  if (!document.getElementById("cartItems")) return;

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartItems");
  const totalDisplay = document.getElementById("totalPrice");
  cartContainer.innerHTML = "";

  let total = 0;

  cartItems.forEach((item, idx) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "mb-3";
    itemDiv.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <strong>${item.name}</strong> - ₹${item.price}
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeItem(${idx})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
    total += item.price;
  });

  totalDisplay.textContent = `Total Price: ₹${total}`;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function placeOrder() {
  if (confirm("Confirm order placement?")) {
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    window.location.href = "index.html";
  }
}

// Auth UI toggles
function showRegister() {
  document.getElementById("registerSection").classList.remove("hidden");
  document.getElementById("forgotSection").classList.add("hidden");
}

function showForgot() {
  document.getElementById("registerSection").classList.add("hidden");
  document.getElementById("forgotSection").classList.remove("hidden");
}

// Dummy auth functions
function login() {
  alert("Login successful! Redirecting to dashboard...");
  // Redirect logic can be added here
}

function register() {
  alert("Registered successfully!");
}

function resetPassword() {
  alert("Password reset link sent!");
}
