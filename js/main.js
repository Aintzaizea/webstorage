const formulario = document.querySelector("#miFormulario");
const inputProducto = document.querySelector("#nombreProducto");
const cuerpoTabla = document.querySelector("#cuerpoTabla");

const leerLocalStorage = () => { //lee los productos guardados
    return JSON.parse(localStorage.getItem("productos")) || [];
};

let productos = leerLocalStorage(); // productos en memoria del localstorage


const guardarLocalStorage = () => { // guarda en localstorage convertida a texto
    localStorage.setItem("productos", JSON.stringify(productos));
};

const pintarTabla = () => {
    cuerpoTabla.innerHTML = ""; //esto vacía filas
    productos.forEach((producto, indice) => {
        cuerpoTabla.innerHTML += `
    <tr>
        <td>${indice + 1}</td>
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td><button data-indice="${indice}">Eliminar</button></td>
    </tr>
`;
    });

};
pintarTabla(); // al cargar salen los productos guardados

formulario.addEventListener("submit", (ev) => {
    ev.preventDefault(); //la página no recarga al enviar el formulario
    const nombreProducto = formulario.nombreProducto.value.trim(); // lee sin espacios al principio ni al final
    if (nombreProducto === "") {
        return
    }

    const articuloExistente = productos.find( //busca si hay alguno que coincida
        (producto) => producto.nombre === nombreProducto
    );

    if (articuloExistente) {
        articuloExistente.cantidad = articuloExistente.cantidad + 1;
    } else {
        productos.push({ nombre: nombreProducto, cantidad: 1 });
    }
    pintarTabla();
    guardarLocalStorage();
    inputProducto.value = ""; //actualiza y vacía el input
    
});

cuerpoTabla.addEventListener("click", (ev) => {
    const indice = ev.target.dataset.indice; //posicion del producto
    const producto = productos[indice];

    if (producto.cantidad > 1) { // hay más de uno? pues quitamos uno
        producto.cantidad = producto.cantidad - 1;
    } else { 
        productos.splice(Number(indice), 1); //solo queda uno? pues fuera, lo eliminamos
    }

    pintarTabla();
    guardarLocalStorage();
});
