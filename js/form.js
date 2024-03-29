const formulario = document.getElementById("formulario")
const inputs = document.querySelectorAll("#formulario input")
const btn = document.getElementById("formulario__btn")
const serviceID = "service_5kqllmk"
const templateID = "template_b0uk7pl"
var counter = 0

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, 
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	password: /^.{4,12}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, 
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false,
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, "usuario")
			break
		case "nombre":
			validarCampo(expresiones.nombre, e.target, "nombre")
			break
		case "password":
			validarCampo(expresiones.password, e.target, "password")
			validarPassword2()
			break
		case "password2":
			validarPassword2()
			break
		case "correo":
			validarCampo(expresiones.correo, e.target, "correo")
			break
		case "telefono":
			validarCampo(expresiones.telefono, e.target, "telefono")
			break
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto")
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto")
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle")
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle")
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo")
		campos[campo] = true
	} else {
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto")
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto")
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle")
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle")
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo")
		campos[campo] = false
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById("password")
	const inputPassword2 = document.getElementById("password2")

	if (inputPassword1.value !== inputPassword2.value) {
		document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto")
		document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto")
		document.querySelector(`#grupo__password2 i`).classList.add("fa-times-circle")
		document.querySelector(`#grupo__password2 i`).classList.remove("fa-check-circle")
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo")
		campos["password"] = false
	} else {
		document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto")
		document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto")
		document.querySelector(`#grupo__password2 i`).classList.remove("fa-times-circle")
		document.querySelector(`#grupo__password2 i`).classList.add("fa-check-circle")
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo")
		campos["password"] = true
	}
}

inputs.forEach((input) => {
	input.addEventListener("keyup", validarFormulario)
	input.addEventListener("blur", validarFormulario)
})

class Formulario {
	constructor(usuario, nombre, password, correo, telefono) {
		this.usuario = usuario
		this.nombre = nombre
		this.password = password
		this.correo = correo
		this.telefono = telefono
	}

	camposToJSON() {
		let contacto = {}
		contacto["usuario"] = this.usuario
		contacto["nombre"] = this.nombre
		contacto["password"] = this.password
		contacto["correo"] = this.correo
		contacto["telefono"] = this.telefono
		return contacto
	}
}

if (!(localStorage.getItem("counter") != null)) {
	localStorage.setItem("counter", 0)
}

const save_data = () => {
	let myForm = new Formulario(inputs[0].value, inputs[1].value, inputs[2].value, inputs[4].value, inputs[5].value)
	let contacto = myForm.camposToJSON()
	counter = parseInt(localStorage.getItem("counter"))
	localStorage.setItem(`contacto_numero_${(counter)}`, JSON.stringify(contacto))
	localStorage.setItem("counter", counter + 1)
}

const popup = (status) => {
	setTimeout(() => {
		const Toast = Swal.mixin({
			toast: true, position: "top-end", showConfirmButton: false, timer: 3200, timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer)
				toast.addEventListener("mouseleave", Swal.resumeTimer)
			}
		})

		Toast.fire({
			icon: status ? "success" : "error",
			title: status ? "Usuario registrado correctamente!" : "Ocurrió un error al registrarse",
		})
	}, 10)
}

formulario.addEventListener("submit", function (e) {
	e.preventDefault()
	const terminos = document.getElementById("terminos")
	if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
		save_data()
		document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo")
		emailjs.sendForm(serviceID, templateID, formulario)
			.then(() => {
				popup(true)
				formulario.reset()
			}, (err) => {
				popup(false)
			})
		document.querySelectorAll(".formulario__grupo-correcto").forEach((icono) => {
			icono.classList.remove("formulario__grupo-correcto")
		})
	} else {
		document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo")
	}
})