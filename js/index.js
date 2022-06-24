let continuar = true;

const main = (continuar) => {
    while (continuar) {
        alert("Ingrese nombre cliente")
        const nombre = ingresarCliente()
        const producto = agregarProductos()
        const cantidad = agregarCantidad()
        const resultado = multiplicacion(producto,cantidad)
        const importe = mostrarImporte(resultado)
        if (continuar) {
            confirm(`Resumen de orden: \n Nombre Cliente: ${nombre} \n Importe: ${resultado}`)
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

const multiplicacion = (producto,cantidad) => {
    resultado = producto * cantidad
    return resultado
}

main(continuar)