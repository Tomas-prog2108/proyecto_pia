

function iniciarTema() {
    const boton = document.getElementById('btn-tema');

    const temaGuardado = localStorage.getItem('tema');

    if (temaGuardado === 'claro') {
        document.body.classList.add('tema-claro');
        boton.textContent = 'Tema oscuro';
    }

    boton.addEventListener('click', function() {
        document.body.classList.toggle('tema-claro');

        const esTemaClaro = document.body.classList.contains('tema-claro');

        if (esTemaClaro) {
            localStorage.setItem('tema', 'claro');
            boton.textContent = 'Tema oscuro';
        } else {
            localStorage.setItem('tema', 'oscuro');
            boton.textContent = 'Tema claro';
        }
    });
}

const paginaActual = window.location.pathname;

document.querySelectorAll('.nav-btn[href]').forEach(btn => {
    const ruta = btn.getAttribute('href');

    if (paginaActual === ruta) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    iniciarTema();
});

