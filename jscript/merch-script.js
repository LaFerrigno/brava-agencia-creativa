let cart = [];

function openModal(productId) {
  document.getElementById("product-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("product-modal").classList.add("hidden");
}

function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById("cart-count").textContent = cart.length;
  alert(`${name} agregado al carrito`);
  closeModal();
}
