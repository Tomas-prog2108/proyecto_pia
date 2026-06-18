setTimeout(function() {
  document.querySelector('.main').classList.add('visible');
}, 100);

const botones = document.querySelectorAll(".btn-ins");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const snackbar = document.getElementById("snackbar");

    snackbar.classList.add("show");

    setTimeout(() => {
      snackbar.classList.remove("show");
    }, 3000);
  });
});