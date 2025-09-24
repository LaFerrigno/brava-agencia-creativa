document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu compra! Te enviaremos un mail con los detalles.');
        localStorage.removeItem('carrito');
        window.location.href = 'merch.html';
    });

    // Actualiza el contador del carrito si es necesario
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contador = document.getElementById('cart-count');
    if (contador) contador.textContent = totalCantidad;
});
