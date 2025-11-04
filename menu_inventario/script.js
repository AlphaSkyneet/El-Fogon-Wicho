// Cargar inventario desde el archivo JSON
async function cargarInventario() {
    const res = await fetch('data/inventario.json');
    const productos = await res.json();
  
    const tabla = document.getElementById('tablaInventario');
    tabla.innerHTML = '';
  
    productos.forEach(prod => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${prod.codigo}</td>
        <td>${prod.nombre}</td>
        <td>$${prod.precio}</td>
        <td><input type="number" id="cant-${prod.codigo}" value="1" min="1"></td>
        <td><button onclick="agregarPedido('${prod.codigo}', '${prod.nombre}', ${prod.precio})">Agregar</button></td>
      `;
      tabla.appendChild(fila);
    });
  }
  
  const pedidos = [];
  
  function agregarPedido(codigo, nombre, precio) {
    const cantidad = parseInt(document.getElementById(`cant-${codigo}`).value);
    const total = precio * cantidad;
    const pedido = { codigo, nombre, cantidad, total };
  
    pedidos.push(pedido);
    mostrarPedidos();
  }
  
  function mostrarPedidos() {
    const lista = document.getElementById('listaPedidos');
    lista.innerHTML = '';
  
    pedidos.forEach(p => {
      const item = document.createElement('li');
      item.textContent = `${p.cantidad}x ${p.nombre} - Total: $${p.total}`;
      lista.appendChild(item);
    });
  }
  
  cargarInventario();

  // --- Función para limpiar pedidos ---
function limpiarPedidos() {
    pedidos.length = 0; // Vacía el arreglo
    mostrarPedidos();   // Refresca la lista visual
  }
  
  // --- Asignar evento al botón de limpiar ---
  document.getElementById('btnLimpiar').addEventListener('click', limpiarPedidos);
  
  