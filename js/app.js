import Contacto from "./classContacto.js";
//Create - Read - Update - Delete contactos
// const contacto = new Contacto(1, 'Juan', 'Pérez', 'juan.perez@email.com', '555-123-4567');

const modalAdminContacto = new bootstrap.Modal(
  document.getElementById("administrarContacto")
);
const btnAgregarContacto = document.getElementById("btnNuevoContacto");
const formularioContacto = document.querySelector("form");
const nombre = document.getElementById("nombre"),
  apellido = document.getElementById("apellido"),
  telefono = document.getElementById("telefono"),
  email = document.getElementById("email");
const agenda = JSON.parse(localStorage.getItem('agendaKey')) || [];

//funciones
const mostrarModal = () => {
  modalAdminContacto.show();
};

const crearContacto = (e) => {
  e.preventDefault();
  console.log("aqui debo crear el contacto nuevo");
  //verificar que los datos sean validos

  //crearia el contacto
  const nuevoContacto = new Contacto(
    undefined,
    nombre.value,
    apellido.value,
    email.value,
    telefono.value
  );
  console.log(nuevoContacto);
  //agrego el contacto nuevo al array
  agenda.push(nuevoContacto);
  console.log(agenda);
  //resetear el formulario
  limpiarFormulario();
  //guardar el array en localstorage
  guardarEnLocalstorage();
  //dibujar una fila
  crearFila(nuevoContacto, agenda.length)
  //ocultar ventana modal despues de crear el contacto
  modalAdminContacto.hide()
  //mostrar un mensaje al usuario
    Swal.fire({
    title: "Contacto Creado",
    text: `El contacot ${nuevoContacto.nombre}`,
    icon: "success"
  });
};

function limpiarFormulario() {
  formularioContacto.reset();
}

function guardarEnLocalstorage(){
    localStorage.setItem('agendaKey', JSON.stringify(agenda))
}

function crearFila(itemContacto, fila){
    const tablaContactos = document.querySelector('tbody');
    tablaContactos.innerHTML += `<tr>
    <th scope="row">${fila}</th>
    <td>${itemContacto.nombre}</td>
    <td>${itemContacto.apellido}</td>
    <td>${itemContacto.email}</td>
    <td>${itemContacto.celular}</td>
    <td>
      <button class="btn btn-warning">Editar</button
      ><button class="btn btn-danger">Borrar</button>
    </td>
  </tr>`
}

function cargaInicial (){
    if(agenda.length > 0){
        agenda.map((itemContacto, posicion)=> crearFila(itemContacto, posicion + 1))
    }
}

//logica extra
btnAgregarContacto.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();