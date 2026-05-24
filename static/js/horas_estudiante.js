// ============================================
// DATOS DEL ESTUDIANTE
// En una plataforma real estos vendrían del servidor
// ============================================

const horasTotalesRequeridas = 80;

const actividades = [
    {
        proyecto: 'Biblioteca',
        fecha: '12/05/2024',
        horas: 3,
        estado: 'aprobado'
    },
    {
        proyecto: 'Preescolar',
        fecha: '20/05/2024',
        horas: 2,
        estado: 'pendiente'
    },
    {
        proyecto: 'Eventos escolares',
        fecha: '01/06/2024',
        horas: 5,
        estado: 'aprobado'
    },
    {
        proyecto: 'Biblioteca',
        fecha: '10/06/2024',
        horas: 10,
        estado: 'revision'
    }
];


// ============================================
// PASO 1 — CALCULAR HORAS COMPLETADAS
// Solo sumamos las actividades aprobadas
// ============================================

function calcularHorasCompletadas() {
    let total = 0;

    actividades.forEach(function(actividad) {
        if (actividad.estado === 'aprobado') {
            total = total + actividad.horas;
        }
    });

    return total;
}


// ============================================
// PASO 2 — ACTUALIZAR EL RESUMEN DE HORAS
// ============================================

function actualizarResumen() {
    const horasCompletadas = calcularHorasCompletadas();
    const porcentaje = Math.round((horasCompletadas / horasTotalesRequeridas) * 100);

    // Actualizar los textos
    document.getElementById('horasCompletadas').textContent = horasCompletadas;
    document.getElementById('horasTotales').textContent = horasTotalesRequeridas;
    document.getElementById('textoPorcentaje').textContent = porcentaje + '%';

    // Actualizar la barra de progreso
    document.getElementById('barraProgreso').style.width = porcentaje + '%';

    // Actualizar los atributos de accesibilidad
    const contenedorBarra = document.querySelector('.contenedor-barra');
    contenedorBarra.setAttribute('aria-valuenow', horasCompletadas);
    contenedorBarra.setAttribute('aria-valuemax', horasTotalesRequeridas);
}


// ============================================
// PASO 3 — CREAR UN BADGE DE ESTADO
// Devuelve el HTML del badge según el estado
// ============================================

function crearBadge(estado) {
    // Mapeamos cada estado a su clase CSS y su texto
    const estados = {
        aprobado:  { clase: 'badge-aprobado',  texto: 'Aprobado' },
        pendiente: { clase: 'badge-pendiente', texto: 'Pendiente' },
        revision:  { clase: 'badge-revision',  texto: 'En revisión' }
    };

    // Si el estado no existe en el mapa, usamos uno por defecto
    const info = estados[estado] || { clase: 'badge-pendiente', texto: estado };

    return `<span class="badge ${info.clase}">${info.texto}</span>`;
}


// ============================================
// PASO 4 — LLENAR LAS TABLAS CON DATOS
// ============================================

function llenarTablas() {
    const cuerpoResumen    = document.getElementById('cuerpoTablaResumen');
    const cuerpoHistorial  = document.getElementById('cuerpoTablaHistorial');

    // Limpiamos las tablas antes de llenarlas
    cuerpoResumen.innerHTML   = '';
    cuerpoHistorial.innerHTML = '';

    actividades.forEach(function(actividad) {

        // --- Fila para la tabla de RESUMEN (sin columna de evidencia) ---
        const filaResumen = document.createElement('tr');
        filaResumen.innerHTML = `
            <td>${actividad.proyecto}</td>
            <td>${actividad.fecha}</td>
            <td>${actividad.horas}</td>
            <td>${crearBadge(actividad.estado)}</td>
        `;
        cuerpoResumen.appendChild(filaResumen);

        // --- Fila para la tabla de HISTORIAL (con columna de evidencia) ---
        const filaHistorial = document.createElement('tr');
        filaHistorial.innerHTML = `
            <td>${actividad.proyecto}</td>
            <td>${actividad.fecha}</td>
            <td>${actividad.horas}</td>
            <td>${crearBadge(actividad.estado)}</td>
            <td>
                <button class="btn-evidencia" title="Ver evidencia">👁️</button>
            </td>
        `;
        cuerpoHistorial.appendChild(filaHistorial);
    });
}


// ============================================
// PASO 5 — CAMBIO DE PESTAÑAS
// ============================================

function iniciarPestanas() {
    const btnResumen    = document.getElementById('btnResumen');
    const btnHistorial  = document.getElementById('btnHistorial');
    const vistaResumen  = document.getElementById('vistaResumen');
    const vistaHistorial = document.getElementById('vistaHistorial');

    btnResumen.addEventListener('click', function() {
        // Mostrar resumen, ocultar historial
        vistaResumen.classList.remove('oculto');
        vistaHistorial.classList.add('oculto');

        // Marcar pestaña activa
        btnResumen.classList.add('activa');
        btnHistorial.classList.remove('activa');
    });

    btnHistorial.addEventListener('click', function() {
        // Mostrar historial, ocultar resumen
        vistaHistorial.classList.remove('oculto');
        vistaResumen.classList.add('oculto');

        // Marcar pestaña activa
        btnHistorial.classList.add('activa');
        btnResumen.classList.remove('activa');
    });
}


// ============================================
// INICIO — Ejecuta todo cuando la página carga
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    actualizarResumen();
    llenarTablas();
    iniciarPestanas();


    // 👇 Agrega esto
    setTimeout(function() {
        document.querySelector('.seguimiento').classList.add('visible');
    }, 100);
});
