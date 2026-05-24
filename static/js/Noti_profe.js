let contador = 3; // porque ya tienes algunas

function agregarNotificacion() {
    contador++;

    const contenedor = document.getElementById("contenedor-notificaciones");

    const nueva = document.createElement("div");
    nueva.classList.add("card");

    nueva.innerHTML = `
        <div class="user">
            <div class="icon blue"></div>
            <div>
                <div class="texto">Nuevo usuario ${contador} se ha inscrito en el proyecto.</div>
                <div class="time">Justo ahora</div>
            </div>
        </div>
        <div>
            <button onclick="editarNotificacion(this)">Editar</button>
        </div>
    `;

    contenedor.appendChild(nueva);
}