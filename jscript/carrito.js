// ==== FUNCIONES AUXILIARES ====

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarProducto(nombre, precio) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(producto => producto.nombre === nombre);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    guardarCarrito(carrito);
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.textContent = totalCantidad;
    }
}

function obtenerRutaImagen(nombre) {
     // Quita tildes y signos raros
    const nombreSinTildes = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Convierte a PascalCase (cada palabra con mayúscula inicial)
    const pascalCase = nombreSinTildes
        .trim()
        .split(/\s+/)
        .map(palabra => {
            palabra = palabra.toLowerCase();
            return palabra.charAt(0).toUpperCase() + palabra.slice(1);
        })
        .join('');

    return `../img/merch/${pascalCase}.png`;
}

// ==== LÓGICA PARA TODAS LAS PÁGINAS ====

document.addEventListener('DOMContentLoaded', () => {
    // Botones de comprar
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    botonesComprar.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.producto-card');
            const nombre = card.querySelector('h3').textContent;
            const precioTexto = card.querySelector('.precio').textContent;
            const precio = parseInt(precioTexto.replace('$', '').replace('.', ''));
            agregarProducto(nombre, precio);
        });
    });

    actualizarContadorCarrito();

    // ==== SI ESTÁS EN carrito.html ====
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElemento = document.getElementById('total');
    const btnFinalizar = document.getElementById('finalizar');
    const btnVaciar = document.getElementById('vaciar-carrito');

    if (listaCarrito && totalElemento) {
        const carrito = obtenerCarrito();
        listaCarrito.innerHTML = '';

        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<li>Tu carrito está vacío.</li>';
        } else {
            let total = 0;
            carrito.forEach((producto, index) => {
                const li = document.createElement('li');
                li.classList.add('carrito-item');
                li.innerHTML = `
                    <div class="carrito-img">
                        <img src="${obtenerRutaImagen(producto.nombre)}" alt="${producto.nombre}" />
                    </div>
                    <div class="carrito-info">
                        <p class="carrito-nombre">${producto.nombre}</p>
                        <p class="carrito-precio">Precio: $${producto.precio}</p>
                        <div class="carrito-cantidad">
                            <button class="btn-cantidad redondo disminuir" data-index="${index}">−</button>
                            <span>${producto.cantidad}</span>
                            <button class="btn-cantidad redondo aumentar" data-index="${index}">+</button>
                        </div>
                    </div>
                    <div class="carrito-eliminar">
                        <button class="btn-eliminar" data-index="${index}">🗑</button>
                    </div>
                `;
                listaCarrito.appendChild(li);
                total += producto.precio * producto.cantidad;
            });
            totalElemento.textContent = total;

            // Botón aumentar
            document.querySelectorAll('.aumentar').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = btn.dataset.index;
                    carrito[index].cantidad++;
                    guardarCarrito(carrito);
                    location.reload();
                });
            });

            // Botón disminuir
            document.querySelectorAll('.disminuir').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = btn.dataset.index;
                    if (carrito[index].cantidad > 1) {
                        carrito[index].cantidad--;
                    } else {
                        carrito.splice(index, 1);
                    }
                    guardarCarrito(carrito);
                    location.reload();
                });
            });

            // Botón eliminar
            document.querySelectorAll('.btn-eliminar').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = btn.dataset.index;
                    carrito.splice(index, 1);
                    guardarCarrito(carrito);
                    location.reload();
                });
            });
        }

        btnFinalizar?.addEventListener('click', () => {
            location.href = 'checkout.html';
        });

        // Botón vaciar carrito
        btnVaciar?.addEventListener('click', () => {
            if (confirm('¿Deseás vaciar el carrito?')) {
                localStorage.removeItem('carrito');
                location.reload();
            }
        });
    }
});
