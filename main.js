let dataTable;
let dataTableIsInitilized = false;

const dataTableOptions = {
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6]},
        { width: '5%', targets: 1},
        { orderable: false, targets: [0, 1, 2, 3, 4, 5, 6]}
    ]
}

const initDataTable = async () => {
    if (dataTableIsInitilized) {
        dataTable.destroy();
    }

    await listProducts();

    dataTable = $("#facturadorTable").dataTable(dataTableOptions);

    dataTableIsInitilized = true;

};



const listProducts = async() => {
    try {
        const response = await fetch("catalogo.json");
        const products = await response.json();
        console.log(products)

        let content = '';
        products.forEach((prod, index) => {
            content += `
            <tr>
                <td>${prod.nombre}</td>
                <td><input type="number" class="cantidad" min="1" value="1"></td>
                <td>${prod.precio}</td>
                <td><span class="precio-total"></span></td>
                <td>${index + 1}</td>
                <td>${index + 1}</td>
                <td><button class="agregar-carrito btn btn-primary">Agregar</button></td>
            </tr>`;
        });
        tableBody_products.innerHTML = content;
        
    } catch (error) {
        alert(error)
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});