document.getElementById('codigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarProducto();
        e.preventDefault(); // Evita que se envíe el formulario si está dentro de uno
    }
});

document.getElementById('codigo').focus(); // Foco en input

function buscarProducto() {
    var codigo = document.getElementById('codigo').value;
    document.getElementById('cargando').style.display = 'block'; // Mostrar cargando

    fetch('http://localhost:5002/productos?codigo=' + codigo)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var producto = data[0];
                // Formatear el precio
                var precioFormateado = parseFloat(producto.precio).toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS',
                    currencyDisplay: 'symbol',
                    useGrouping: true
                }).replace(/\s/g, ''); // Eliminar espacios en blanco
                document.getElementById('producto').innerHTML = `
                    <h2>${producto.nombre}</h2>
                    <p><strong>Precio:</strong> ${precioFormateado}</p>
                `;
            } else {
                document.getElementById('producto').innerHTML = '<p>Producto no encontrado</p>';
            }
            document.getElementById('codigo').value = ''; // Borrar el input
            document.getElementById('cargando').style.display = 'none'; // Ocultar cargando
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('producto').innerHTML = '<p>Error al buscar el producto</p>';
            document.getElementById('codigo').value = ''; // Borrar el input de entrada en caso de error
            document.getElementById('cargando').style.display = 'none'; // 
        });
}
