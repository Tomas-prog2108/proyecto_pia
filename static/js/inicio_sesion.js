const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 2 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168,85,247,${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
}
animParticles();

function toggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('themeBtn');
  if (html.dataset.theme === 'dark') {
    html.dataset.theme = 'light';
    btn.textContent = 'Modo oscuro';
  } else {
    html.dataset.theme = 'dark';
    btn.textContent = 'Modo claro';
  }
}

let estudiantes = [];

function registrarEstudiante() {
  const nombre    = document.getElementById('sNombre').value.trim();
  const documento = document.getElementById('sDocumento').value.trim();
  const grado     = document.getElementById('sGrado').value;

  if (!nombre || !documento) {
    showToast('Por favor completa todos los campos');
    return;
  }

  if (estudiantes.find(e => e.documento === documento)) {
    showToast('Ya existe un estudiante con ese documento');
    return;
  }

  estudiantes.push({ nombre, documento, grado });

  document.getElementById('sNombre').value = '';
  document.getElementById('sDocumento').value = '';
  document.getElementById('sGrado').value = '10';

  renderEstudiantes();
  renderStats();
  renderResumen();
  showToast('Estudiante registrado correctamente');
}

function renderStats() {
  document.getElementById('totalEst').textContent = estudiantes.length;
  document.getElementById('totalG10').textContent = estudiantes.filter(e => e.grado === '10').length;
  document.getElementById('totalG11').textContent = estudiantes.filter(e => e.grado === '11').length;
}

function renderResumen() {
  const tbody = document.getElementById('resumenBody');
  tbody.innerHTML = estudiantes.slice(0, 5).map(e => `
    <tr>
      <td>${e.nombre}</td>
      <td style="font-family:monospace;font-size:12px">${e.documento}</td>
      <td>${e.grado}</td>
      <td><span class="badge badge-ok">Registrado</span></td>
    </tr>`).join('');
}

function renderEstudiantes() {
  const tbody = document.getElementById('estudiantesBody');
  tbody.innerHTML = estudiantes.map((e, i) => `
    <tr>
      <td>${e.nombre}</td>
      <td style="font-family:monospace;font-size:12px">${e.documento}</td>
      <td>${e.grado}</td>
      <td><span class="badge badge-ok">Registrado</span></td>
      <td><button onclick="eliminar(${i})" style="background:none;border:1px solid #f87171;color:#f87171;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:12px">Eliminar</button></td>
    </tr>`).join('');
}

function eliminar(i) {
  estudiantes.splice(i, 1);
  renderEstudiantes();
  renderStats();
  renderResumen();
  showToast('Estudiante eliminado del sistema');
}

function setNav(btn, panel) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#mainContent > div').forEach(d => d.style.display = 'none');
  document.getElementById(panel).style.display = '';
  if (panel === 'panelEstudiantes') renderEstudiantes();
  if (panel === 'panelRegistrar') {
    document.getElementById('sNombre').value = '';
    document.getElementById('sDocumento').value = '';
    document.getElementById('sGrado').value = '10';
  }
  if (panel === 'panelInicio') { renderStats(); renderResumen(); }
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'dashboardScreen') { renderStats(); renderResumen(); }
}

function loginAdmin() {
  const user = document.getElementById('adminUser').value.trim();
  const pass = document.getElementById('adminPass').value.trim();
  if (user === 'admin' && pass === 'javiera2025') {
    showScreen('dashboardScreen');
    document.getElementById('adminUser').value = '';
    document.getElementById('adminPass').value = '';
  } else {
    showToast('Credenciales incorrectas');
  }
}

function logOut() {
  showScreen('loginScreen');
}

function loginStudent() {
  const id   = document.getElementById('studentId').value.trim();
  const pass = document.getElementById('studentPass').value.trim();
  const est  = estudiantes.find(e => e.documento === id);
  if (est) {
    showToast('Acceso solo para uso administrativo');
  } else {
    showToast('Usuario o contrasena incorrectos');
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}