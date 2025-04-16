function actualizarPrecio() {
    const opcion = document.getElementById('opcion').value;
    const precioMostrado = document.getElementById('precio-mostrado');
  
    const precioMatch = opcion.match(/\$([\d\.]+)/);
    if (precioMatch) {
      const precio = precioMatch[1].replace(/\./g, '');
      precioMostrado.textContent = `$${Number(precio).toLocaleString('es-CO')}`;
    }
  }
  
  document.getElementById('product-options').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const opcion = document.getElementById('opcion').value;
    const topSize = document.getElementById('top-size').value;
    const pantySize = document.getElementById('panty-size').value;
    const color = document.getElementById('color').value;
  
    console.log({
      opcion,
      topSize,
      pantySize,
      color
    });
  
    alert('Producto agregado al carrito con tus opciones 🛒');
  });
  