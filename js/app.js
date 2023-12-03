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
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];

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
  crearFila(nuevoContacto, agenda.length);
  modalAdminContacto.hide();
  //mostrar un mensaje al usuario
  Swal.fire({
    title: "Contacto creado",
    text: `El contacto ${nuevoContacto.nombre} fue creado correctamente`,
    icon: "success",
  });
};

function limpiarFormulario() {
  formularioContacto.reset();
}

function guardarEnLocalstorage() {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
}

function crearFila(contacto, fila) {
  const tablaContactos = document.querySelector("tbody");
  tablaContactos.innerHTML += `<tr>
    <th scope="row">${fila}</th>
    <td>${contacto.nombre}</td>
    <td>${contacto.apellido}</td>
    <td>${contacto.email}</td>
    <td>${contacto.celular}</td>
    <td>
      <button class="btn btn-warning" onclick="editarContacto('${contacto.id}')">Editar</button>
      <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
    </td>
  </tr>`;
}

function cargaInicial() {
  if (agenda.length > 0) {
    agenda.map((itemContacto, posicion) =>
      crearFila(itemContacto, posicion + 1)
    );

    // const tablaContactos = document.querySelector('tbody');
    // for(let i=0; i < agenda.length; i++)
    // {
    //   tablaContactos.innerHTML += `<tr>
    //   <th scope="row">${i++}</th>
    //   <td>${agenda[i].nombre}</td>
    //   <td>${agenda[i].apellido}</td>
    //   <td>${agenda[i].email}</td>
    //   <td>${agenda[i].celular}</td>
    //   <td>
    //     <button class="btn btn-warning">Editar</button
    //     ><button class="btn btn-danger">Borrar</button>
    //   </td>
    // </tr>`
    // }
  }
  //agregar un cartel informativo para el usuario
}
window.borrarContacto = (idContacto) => {
  Swal.fire({
    title: "¿Estas seguro que quieres borrar?",
    text: "No puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui agrego mi logica
      console.log("desde la funcion borrar contacto");
      console.log(idContacto);
      //buscar en el array el objeto que tiene este idContacto arrray.findIndex
      const posicionContactoBuscado = agenda.findIndex(
        (itemContacto) => itemContacto.id === idContacto
      );
      console.log(posicionContactoBuscado);
      //borrar el objeto del array usando splice(posicion del objeto, cuantos borro)
      agenda.splice(posicionContactoBuscado, 1);
      //actualizar el localstorage
      guardarEnLocalstorage();
      //borrar una fila de la tabla
      const tablaContactos = document.querySelector("tbody");
      console.log(tablaContactos.children[posicionContactoBuscado]); //objeto.propiedad[posicionarray]
      tablaContactos.removeChild(
        tablaContactos.children[posicionContactoBuscado]
      );
      Swal.fire({
        title: "Contacto eliminado",
        text: "El contacto fue eliminado exitosamente",
        icon: "success",
      });
    }
  });
};

//editar Contacto
window.editarContacto = (idContacto) => {
 
   Swal.fire({
    title: "¿Estas seguro que quieres Editar el contacto?",
    text: "No puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Editar",
    cancelButtonText: "Cancelar",
  }).then((result)=>{
    if(result.isConfirmed){
       console.log('desde la funcion editar contacto')
       console.log(idContacto)

       const posicionContactoAeditar = agenda.findIndex((itemContacto)=> itemContacto.id === idContacto);
       console.log(posicionContactoAeditar)
       
      const mostarDatosGuradados = ()=>{
        if(agenda.length > 0){
          
          const primercontacto = agenda[posicionContactoAeditar];
          nombre.value = primercontacto.nombre;
          apellido.value = primercontacto.apellido;
          email.value = primercontacto.email;
          telefono.value = primercontacto.celular;
          // mostramos el modale con los datos ya guardados()
        }
      }
      mostrarModal(mostarDatosGuradados())
      
      /* pendiente de reemplar una column vieja por una nueva  */
    

    }
  })
}



//logica extra
btnAgregarContacto.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", crearContacto);

cargaInicial();