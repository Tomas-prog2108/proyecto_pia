let todosLosEstudiantes = [];

async function cargarEStudiantes(){
    try{
        const respuesta = await fetch('/api/estudiantes');
        todosLosEstudiantes = await respuesta.json();
        mostraEstudiantes(todosLosEstudiantes)

    } catch (error) {
        console.error('Error al cargar los estudiantes', error);
    }
}

function obtenerIniciales(nombre) {
    const palabras = nombre.split(' ');
    
    const iniciales = palabras
        .slice(0,2)
        .map(function(palabra){
            return palabra[0]
        })

        .join('');
    return iniciales.toUpperCase();

}

function crearTarjeta(estudiante) {
    const li = document.createElement('li');
    li.className = 'tarjeta-estudiante';

    const iniciales = obtenerIniciales(estudiante.nombre);
    li.innerHTML = `
        <div class="contenedor-avatar-info">
            <div class="avatar">${iniciales}</div>
            <div>
                <p class="nombre-estudiante">${estudiante.nombre}</p>
                <p class="detalle-estudiante">
                    ${estudiante.grado} · Documento: ${estudiante.documento}
                </p>
            </div>
        </div>
        <span class="flecha-tarjeta"><i class="fa-solid fa-angle-right"></i></span>
    `;

    return li;

}

function mostraEstudiantes(lista) {
    const contenedor = document.getElementById('listaEstudiantes');
    const mensajeVacio = document.getElementById('mensajeVacio');

    contenedor.innerHTML = '';

    if (lista.length === 0) {
        mensajeVacio.classList.remove('oculto');

    } else {
        mensajeVacio.classList.add('oculto');

        lista.forEach(function(estudiante){
            const tarjeta = crearTarjeta(estudiante);
            contenedor.appendChild(tarjeta);
        });
    }
}

function Iniciarbusqueda(){
    const input = document.getElementById('busqueda');

    input.addEventListener('input', function(){
        const textoBuscado = input.value.toLowerCase();

        if(textoBuscado === ''){
            mostraEstudiantes(todosLosEstudiantes);
            return;
        }

        const resultados = todosLosEstudiantes.filter(function(estudiante){
            return estudiante.documento.startsWith(textoBuscado);
        });
        mostraEstudiantes(resultados);
    });
}


document.addEventListener('DOMContentLoaded', async function () {    
    await cargarEStudiantes();
    Iniciarbusqueda();

    setTimeout(function() {
        document.querySelector('.main').classList.add('visible')
    }, 100);
    
});