document.addEventListener('DOMContentLoaded', () => {
    const carritoIcono = document.getElementById('carritoIcono');
    const carritoModal = document.querySelector('.carrito-modal');
    const carritoContenido = document.querySelector('.carrito-contenido');
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    const totalCarritoElement = document.querySelector('.total-carrito');
    const botonVaciarCarrito = document.querySelector('.vaciar-carrito');
    const botonCerrarCarrito = document.querySelector('.cerrar-carrito');
    const botonContinuarCompra = document.querySelector('.continuar-compra');

    let carrito = [];

    // Función para guardar el carrito en el almacenamiento local
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para cargar el carrito desde el almacenamiento local
    function cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            mostrarCarrito();
        }
    }

    // Función para añadir un producto al carrito
    function agregarAlCarrito(event) {
        const boton = event.target;
        const productoCard = boton.closest('.product-card, .product-cardCrop, .product-cardAcce');
        const productoId = productoCard.dataset.id;
        const nombreProducto = productoCard.dataset.nombre;
        let precioProducto;
        let opcionSeleccionadaTexto = "";

        const selectElement = productoCard.querySelector('.opcion-producto');

        if (selectElement) {
            // Si hay un select, obtiene el precio de la opción seleccionada
            const selectedOption = selectElement.options[selectElement.selectedIndex];
            const precioTexto = selectedOption.value.split(' - $')[1];
            if (precioTexto) {
                precioProducto = parseFloat(precioTexto.replace('.', ''));
                opcionSeleccionadaTexto = selectedOption.textContent;
            } else {
                console.error(`Error: Formato de valor incorrecto en el select del producto ${nombreProducto}`);
                return; // Sale de la función si el formato es incorrecto
            }
        } else {
            // Si no hay select, intenta obtener el precio del párrafo o del data-precio
            const precioParrafo = productoCard.querySelector('p');
            if (precioParrafo && precioParrafo.textContent.includes('$')) {
                const precioTexto = precioParrafo.textContent.split('$')[1];
                precioProducto = parseFloat(precioTexto.replace('.', ''));
            } else if (productoCard.dataset.precio) {
                precioProducto = parseFloat(productoCard.dataset.precio);
            } else {
                console.error(`Error: No se pudo determinar el precio del producto ${nombreProducto}`);
                return; // Sale de la función si no se encuentra el precio
            }
        }

        const productoExistente = carrito.find(item => item.id === productoId && item.opcion === opcionSeleccionadaTexto);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                id: productoId,
                nombre: nombreProducto,
                precio: precioProducto,
                cantidad: 1,
                opcion: opcionSeleccionadaTexto
            });
        }

        guardarCarrito();
        mostrarCarrito();
    }
    // Función para mostrar los productos en el modal del carrito
    function mostrarCarrito() {
        carritoContenido.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const itemCarrito = document.createElement('div');
            itemCarrito.classList.add('item-carrito');
            itemCarrito.innerHTML = `
                <p>${item.nombre} ${item.opcion ? `(${item.opcion})` : ''} - Cantidad: ${item.cantidad} - Precio: $${(item.precio * item.cantidad).toLocaleString('es-CO')}</p>
            `;
            carritoContenido.appendChild(itemCarrito);
            total += item.precio * item.cantidad;
        });

        totalCarritoElement.textContent = `Total: $${total.toLocaleString('es-CO')}`;
    }

    // Función para mostrar/ocultar el modal del carrito
    function toggleCarritoModal() {
        carritoModal.style.display = carritoModal.style.display === 'block' ? 'none' : 'block';
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    }

    // Event listeners
    carritoIcono.addEventListener('click', function(event) {
        event.preventDefault(); // Evita la redirección del enlace
        toggleCarritoModal();
    });

    botonCerrarCarrito.addEventListener('click', toggleCarritoModal);

    botonContinuarCompra.addEventListener('click', function() {
        // Aquí deberías redirigir a la página de la pasarela de pagos
        // Puedes usar window.location.href para esto.
    
        // Ejemplo:
        window.location.href = 'https://www.tu-pasarela-de-pagos.com/checkout';
    
        // Consideraciones importantes aquí:
        // 1. Necesitas reemplazar la URL de ejemplo con la URL real de tu pasarela de pagos.
        // 2. Posiblemente necesites enviar la información del carrito a la pasarela de pagos.
        //    La forma de hacer esto depende de cómo funcione tu pasarela de pagos.
        //    Podría ser a través de parámetros en la URL, un formulario POST, o una API.
        // 3. Deberías cerrar el modal después de redirigir (opcional).
        //    toggleCarritoModal();
    });

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    botonVaciarCarrito.addEventListener('click', vaciarCarrito);

    // Cargar el carrito al cargar la página
    cargarCarrito();
    mostrarCarrito(); // Mostrar el carrito inicial (si hay algo guardado)
});