
const dataTableOptions = {
    "lenghtChange": false,
    "searching" : false
}

// Cargar catálogo de productos con DataTables
var productosTable = $('#facturadorTable').DataTable({
    ajax: {
        url: 'catalogo.json',
        dataSrc: ''
    },
    columns: [
        { data: 'nombre' },
        {
            data: null,
            render: function (data, type, row) {
                return '<input type="number" class="cantidad" min="1" value="1">'
            }
        },
        { data: 'precio' },
        {
            data: null,
            render: function (data, type, row) {
                return '<span class="precio-total"></span>'
            }
        }, // PRECIO TOTAL
        { data: null },
        { data: null },
        {
            data: null,
            render: function (data, type, row) {
                return '<button class="agregar-carrito btn btn-primary">Agregar</button>';
            }
        }
    ],
    rowCallback: function (row, data, index) {

        // Almacenar datos del producto en un array
        var productos = productosTable.data();
        productos[index] = data;
        productosTable.data(productos);

        // Calcular el precio total
        var precioUnitario = data.precio;
        var $cantidad = $(row).find('.cantidad');
        var $precioTotal = $(row).find('.precio-total');

        $cantidad.on('change', function () {
            var cantidad = parseInt($(this).val());
            var precioTotal = cantidad * precioUnitario;
            $precioTotal.text(precioTotal.toFixed(2));
        });

        // Disparar el evento change
        $cantidad.trigger('change');

    }
});