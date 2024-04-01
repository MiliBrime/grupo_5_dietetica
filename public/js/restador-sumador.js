window.addEventListener("load", function() {
    let restador = document.getElementById("restador");
    let sumador = document.getElementById("sumador");
    let cantidad = document.getElementById("cantidad");
    let precioUnitarioElemento = document.getElementById("unidad");
    let precioTotalElemento = document.getElementById("total");
    let precioUnitario = parseFloat(precioUnitarioElemento.textContent);

    cantidad.innerText = "1";

    actualizarPrecioTotal(1);

    restador.addEventListener("click", function() {
        let valorActual = parseInt(cantidad.textContent);
        if (valorActual > 1) {
            valorActual--;
            cantidad.innerText = valorActual;
            actualizarPrecioTotal(valorActual);
        }
    });

    sumador.addEventListener("click", function() {
        let valorActual = parseInt(cantidad.textContent);
        valorActual++;
        cantidad.innerText = valorActual;
        actualizarPrecioTotal(valorActual);
    });

    function actualizarPrecioTotal(cantidad){
        let total = cantidad * precioUnitario;
        precioTotalElemento.innerText = total.toFixed(2);
    }
});