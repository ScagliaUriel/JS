let continuar = true;

function multiplicacion(producto, cantidad){
    let resultado = producto * cantidad
    return resultado
    alert (resultado)
}


const main = (continuar) => {
    while (continuar) {
        alert("Ingrese nombre cliente")
        const nombre = ingresarCliente()
        const producto = agregarProductos()
        const cantidad = agregarCantidad()
        multiplicacion()
        mostrarImporte()
        if (continuar) {
            confirm(`Resumen de orden: \n Nombre Cliente: (nombre) \n Importe: (mostrarImporte)`)
            continuar = confirm("¿Desea agregar nuevo pedido?")
        } else {
            continuar = confirm("¿Desea intentarlo nuevamente?")
        }
    }
}

const ingresarCliente = () => {
    const nombre = parseInt(prompt("Ingresar nombre cliente:"))
    // verifico que este bien ingresado
    if (isNaN(nombre) && nombre !== "" && nombre !== null) {
        return nombre
    } else {
        alert("Ingrese cliente de manera correcta")
        ingresarCliente()
    }
}

const agregarProductos = () => {
    const producto = parseFloat(prompt("Ingrese valor producto"))
    if (!isNaN(producto) && producto !== "" && producto !== null) {
        return producto
    } else {
        alert("Ingrese valor de manera correcta")
        agregarProductos()
    }
}

const agregarCantidad = () => {
    const cantidad = parseFloat(prompt("Ingrese cantidad producto"))
    if (!isNaN(cantidad) && cantidad !== "" && cantidad !== null) {
        return cantidad
    } else {
        alert("Ingrese valor de manera correcta")
        agregarCantidad()
    }
}

function multiplicacion(producto,cantidad){
    resultado = producto * cantidad
    return resultado
}

function mostrarImporte(resultado){
    alert("El importe es: " + resultado)
}

main(continuar)