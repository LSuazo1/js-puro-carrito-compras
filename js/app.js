//Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
cargarEventListeners();

function cargarEventListeners() {
    //cuando agregas un curso precionando "AgregarCurso"
    listaCursos.addEventListener('click', agregarCurso);
    //elimar del carrito
    carrito.addEventListener('click', eliminarCurso);


    //Muestra los cursos en el localStorage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito=JSON.parse(localStorage.getItem('carrito'))||[];

        carritoHTML();
    });

    //vaciar carrito que
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();

    });
}


function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== e.target.getAttribute('data-id'));
        carritoHTML();
    }
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelecionado);
    }
}

//lee el contenido del html y extrae la info
function leerDatosCurso(curso) {
    //crear un objeto con el contenido del curso actualizar el
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        //actualizamos
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //cursos que ocupamos
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //aAgregaElementos
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
}

let carritoHTML = () => {
    //limpiar el html
    limpiarHTML();
    //recorre el carrito
    articulosCarrito.forEach(articulo => {
        const { id, imagen, precio, titulo, cantidad } = articulo;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
               ${cantidad}
            </td>
            <td>
               <a href="#"  class="borrar-curso" data-id=${id}>X</a>
            </td>
        `;
        //agreag el html del carrito en el thbody
        contenedorCarrito.appendChild(row);
    });
    //Agregar el carrito al localStorage
    sincronizarStorage();
}


//agregar al localStorage

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

let limpiarHTML = () => {
    //forma lenta
    //contenedorCarrito.innerHTML='';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

