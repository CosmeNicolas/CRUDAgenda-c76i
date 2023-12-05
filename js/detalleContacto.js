//extraer parametro de la URL

console.log(window.location.search)

const parametroURL = new URLSearchParams(window.location.search);
const idContacto = parametroURL.get('id')

console.log(idContacto);

//traer del localSotrage la agenda

const agendaNueva = JSON.parse(localStorage.getItem('agendaKey'))
console.log(agendaNueva)
//obetener el objeto que corresponde al idContacto
const contactoBuscado = agendaNueva.find((itemContacto) => itemContacto.id === idContacto);
console.log(contactoBuscado)
//dibujar los datos en la card Horizontal
const mainDetalleContacto = document.querySelector('main');

mainDetalleContacto.innerHTML = `
 <article class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src="https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            class="img-fluid rounded-start" alt="usuario" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Contacto: ${contactoBuscado.nombre}, ${contactoBuscado.apellido}</h5>
            <ul>
              <li>Email:${contactoBuscado.email}</li>
              <li>Celular: ${contactoBuscado.celular}</li>
            </ul>
          </div>
        </div>
      </div>
    </article>`