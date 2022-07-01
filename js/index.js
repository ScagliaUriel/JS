const especialidades = ["Medicina General", "Pediatria", "Traumatologia", "Gastroenterologia"]
const medicos = [];
const pacientes = [];
let continuar = true;

class medicoTratante {
    constructor(apellido, especialidad, horasDisponibles) {
        this.apellido = apellido,
            this.especialidad = especialidad,
            this.horasDisponibles = horasDisponibles,
            this.horasTomadas = []
    }
}

class paciente {
    constructor(nombre, apellido, medico, horaAtencion) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.medico = medico,
            this.horaAtencion = horaAtencion
    }
}

const main = (continuar) => {
    while (continuar) {
        alert("Bienvenido al sistema de toma de horas, porfavor ingresar los datos que se le solicitaran a continuación")
        const nombre = ingresarNombre()
        const apellido = ingresarApellido()
        const medicosEspecialidad = seleccionarEspecialidad()
        const medicoSeleccionado = seleccionarMedico(medicosEspecialidad)
        const horaSeleccionada = seleccionarHora(medicoSeleccionado)
        const confirmarHora = confirm(`Porfavor confirma que la informacion sea la correcta: \n Nombre Paciente: ${nombre} ${apellido} \n Medico Tratante: Doctor ${medicoSeleccionado.apellido} \n Hora : ${horaSeleccionada}`)
        if (confirmarHora) {
            alert("Su hora a sido agendada")
            const pacienteAgendado = new paciente(nombre, apellido, medicoSeleccionado.apellido, horaSeleccionada)
            agendarHora(horaSeleccionada, medicoSeleccionado, pacienteAgendado)
            continuar = confirm("¿Desea agendar una nueva hora?")
        } else {
            continuar = confirm("¿Desea intentarlo nuevamente?")
        }
    }
}

const agendarHora = (horaAgendada, medico, nuevoPaciente) => {
    pacientes.push(nuevoPaciente)
    medico.horasTomadas.push(medico.horasDisponibles[horaAgendada - 1])
    medico.horasDisponibles.splice(horaAgendada - 1, 1)
}

const ingresarNombre = () => {
    const nombre = prompt("Ingresa tu nombre:")
    if (isNaN(nombre) && nombre !== "" && nombre !== null) {
        return nombre
    } else {
        alert("Recuerda ingresar tu nombre de manera correcta")
        ingresarNombre()
    }
}

const ingresarApellido = () => {
    const apellido = prompt("Ingresa tu apellido:")
    if (isNaN(apellido) && apellido !== "" && apellido !== null) {
        return apellido
    } else {
        alert("Recuerda ingresar tu apellido de manera correcta")
        ingresarApellido()
    }
}

const seleccionarEspecialidad = () => {
    let mensajeEspecialidad = "¿Para que especialidad desea solicitar su hora? \n Ingrese el numero de la especialidad \n"
    especialidades.forEach((especialidad, key) => mensajeEspecialidad += `${key + 1}.- ${especialidad} \n`)
    const especialidad = prompt(mensajeEspecialidad)
    if (!isNaN(especialidad) && especialidad !== "" && especialidad <= especialidades.length && especialidad !== null) {
        return medicos.filter(medico => medico.especialidad === especialidades[especialidad - 1])
    } else {
        alert("Error en tu seleccion, intenta nuevamente")
        seleccionarEspecialidad()
    }
}

const seleccionarMedico = (medicos) => {
    let mensajeSeleccionarMedico = `Para de la especialidad "${medicos[0].especialidad}" tenemos ${medicos.length} medicos disponibles. \n ¿De que medico desea ver los horarios disponibles? \n`
    medicos.forEach((medico, key) => mensajeSeleccionarMedico += `${key + 1}.- Doctor/a ${medico.apellido} \n`)
    const medicoSeleccionado = prompt(mensajeSeleccionarMedico)
    if (!isNaN(medicoSeleccionado) && medicos !== "" && medicoSeleccionado <= medicos.length && medicoSeleccionado !== null) {
        return medicos[medicoSeleccionado - 1]
    } else {
        alert("Error en tu seleccion, intenta nuevamente")
        seleccionarMedico()
    }
}

const seleccionarHora = (medico) => {
    let mensajeSeleccionarHora = `Selecciona la hora que desea solicitar \n`
    medico.horasDisponibles.forEach((hora, key) => mensajeSeleccionarHora += `${key + 1}.- ${hora} \n`)
    const horaSeleccionada = prompt(mensajeSeleccionarHora)
    if (!isNaN(horaSeleccionada) && horaSeleccionada !== "" && horaSeleccionada <= medico.horasDisponibles.length && horaSeleccionada !== null) {
        return medico.horasDisponibles[horaSeleccionada - 1]
    } else {
        alert("Error en tu seleccion, intenta nuevamente")
        seleccionarHora()
    }
}

medicos.push(new medicoTratante("Campos", "Medicina General", ["10:00 am", "11:00 am", "12:00 pm", "13:00 pm", "14:00 pm"]))
medicos.push(new medicoTratante("Figueroa", "Medicina General", ["10:30 am", "11:30 am", "12:30 pm", "13:30 pm", "14:30 pm"]))
medicos.push(new medicoTratante("Elgueta", "Pediatria", ["9:30 am", "10:30 am", "11:30 am", "12:00 pm", "13:00 pm", "14:00 pm"]))
medicos.push(new medicoTratante("Jara", "Pediatria", ["9:00 am", "10:00 am", "11:00 am", "12:30 pm", "13:30 pm", "14:30 pm"]))
medicos.push(new medicoTratante("Ormazabal", "Traumatologia", ["9:30 am", "10:30 am", "11:30 am", "12:00 pm", "13:00 pm", "14:00 pm"]))
medicos.push(new medicoTratante("Urrutia", "Traumatologia", ["9:00 am", "10:00 am", "11:00 am", "12:30 pm", "13:30 pm", "14:30 pm"]))
medicos.push(new medicoTratante("Parra", "Gastroenterologia", ["14:00 pm", "15:00 pm", "16:00 pm", "17:00pm", "18:00pm"]))
medicos.push(new medicoTratante("Perez", "Gastroenterologia", ["14:30 pm", "15:30 pm", "16:30 pm", "17:30pm", "18:30pm"]))

main(continuar)