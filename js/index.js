let tabla = "";
let continuar = true;

while (continuar) {
    let numero = prompt("Ingrese el numero del cual deseas realizar su tabla de multiplicar")
    if (!isNaN(numero)) {
        tabla += `Tabla del ${numero} \n`
        for (i = 1; i <= 10; i++) {
            tabla += `${numero} * ${i} = ${numero * i} \n`
    }
    alert(tabla)
    tabla = ""
    }else{
        alert("Favor ingresar solo numeros")
    }
    continuar = confirm("Desea continuar con otro numero?")
}    