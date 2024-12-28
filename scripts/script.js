let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosContainer = document.getElementById("productos");
const lentesDeSolContainer = document.getElementById("lentesDeSol");
const armazonesContainer = document.getElementById("armazones");
const popupCarrito = document.getElementById("popupCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const totalCarrito = document.getElementById("total");
const abrirCarrito = document.getElementById("abrirCarrito");
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
const cerrarCarritoBtn = document.getElementById("cerrarCarrito");
const comprarBtn = document.getElementById("comprar");
const mensajeCompra = document.getElementById("mensajeCompra");

let productos = [];

// Cargar productos desde el archivo JSON
async function cargarProductos() {
    const response = await fetch("data/productos.json");
    productos = await response.json();
    renderProductos();
}

// Agregar productos al HTML
function renderProductos() {
    lentesDeSolContainer.innerHTML = "<h2>Lentes de Sol</h2>";
    armazonesContainer.innerHTML = "<h2>Armazones</h2>";
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button data-id="${producto.id}">Agregar al Carrito</button>
        `;
        if (producto.categoria === "Lentes de Sol") {
            lentesDeSolContainer.appendChild(productoDiv);
        } else if (producto.categoria === "Armazones") {
            armazonesContainer.appendChild(productoDiv);
        }
    });

    const botones = document.querySelectorAll("button");
    botones.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(event) {
    const id = parseInt(event.target.dataset.id);
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (!producto) {
        console.error('Producto no encontrado:', id);
        return;
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `${producto.nombre} ha sido agregado al carrito.`,
        timer: 1500,
        showConfirmButton: false
    });
}

// Actualizar el carrito en el DOM y en el localStorage
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const productoDiv = document.createElement("li");
        productoDiv.classList.add("producto-en-carrito");
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div>
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <div class="cantidad">
                    <button class="decrementar" data-id="${producto.id}">-</button>
                    <input type="text" value="${producto.cantidad}" readonly>
                    <button class="incrementar" data-id="${producto.id}">+</button>
                </div>
            </div>
        `;
        listaCarrito.appendChild(productoDiv);
    });

    document.querySelectorAll(".incrementar").forEach(button => {
        button.addEventListener("click", incrementarCantidad);
    });

    document.querySelectorAll(".decrementar").forEach(button => {
        button.addEventListener("click", decrementarCantidad);
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarTotal();
}

// Incrementar cantidad de un producto en el carrito
function incrementarCantidad(event) {
    const id = parseInt(event.target.dataset.id);
    const producto = carrito.find(p => p.id === id);
    producto.cantidad++;
    actualizarCarrito();
}

// Eliminar cantidad de un producto en el carrito
function decrementarCantidad(event) {
    const id = parseInt(event.target.dataset.id);
    const producto = carrito.find(p => p.id === id);
    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito = carrito.filter(p => p.id !== id);
    }
    actualizarCarrito();
}

// Actualizar el total del carrito
function actualizarTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalCarrito.textContent = `Total: $${total}`;
    contadorCarrito.textContent = carrito.length;
}

// Vaciar el carrito
vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
    Swal.fire({
        icon: 'success',
        title: 'Carrito limpio',
        text: 'El carrito ha sido vaciado.',
        timer: 1500,
        showConfirmButton: false
    });
});

// Comprar productos
comprarBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        text: '¡Muchas gracias por confiar en Óptica RH!',
        timer: 3000,
        showConfirmButton: false
    });
});

// Mostrar/ocultar el popup del carrito
abrirCarrito.addEventListener("click", () => {
    popupCarrito.classList.toggle("visible");
    popupCarrito.setAttribute("aria-hidden", !popupCarrito.classList.contains("visible"));
});

cerrarCarritoBtn.addEventListener("click", () => {
    popupCarrito.classList.remove("visible");
    popupCarrito.setAttribute("aria-hidden", "true");
});

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    actualizarCarrito();
});