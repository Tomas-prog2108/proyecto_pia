// ── Data ──────────────────────────────────────────────────────
const USERS = {
  student: { pass: '1234',      role: 'student', name: 'Juan Pérez',   initials: 'JP' },
  admin:   { pass: 'admin2024', role: 'admin',   name: 'Coordinador',  initials: 'AD' }
};

let state = {
  done: 20,
  total: 80,
  role: null
};

// ── Login / Logout ────────────────────────────────────────────
function doLogin() {
  const key  = document.getElementById('sel-user').value;
  const pass = document.getElementById('inp-pass').value.trim();
  const err  = document.getElementById('login-error');

  if (!key || !USERS[key] || USERS[key].pass !== pass) {
    err.classList.add('show');
    return;
  }
  err.classList.remove('show');

  const user = USERS[key];
  state.role = user.role;

  // Set UI
  document.getElementById('welcome-name').textContent = `¡Bienvenido, ${user.name}!`;
  document.getElementById('welcome-sub').textContent =
    user.role === 'admin'
      ? 'Panel de coordinación — puedes editar el progreso de los estudiantes.'
      : 'Aquí tienes el resumen de tu actividad académica.';

  document.getElementById('avatar-initials').textContent = user.initials;

  const badge = document.getElementById('role-badge');
  badge.textContent = user.role === 'admin' ? 'Administrador' : 'Estudiante';
  badge.className   = 'role-badge ' + user.role;

  // Admin panel visibility
  document.getElementById('admin-panel').classList.toggle('visible', user.role === 'admin');
  document.getElementById('readonly-notice').classList.toggle('visible', user.role === 'student');

  // Hide login
  document.getElementById('login-overlay').classList.add('hidden');

  // Animate chart after a tick
  setTimeout(renderProgress, 100);
}

function doLogout() {
  state.role = null;
  document.getElementById('sel-user').value = '';
  document.getElementById('inp-pass').value = '';
  document.getElementById('login-error').classList.remove('show');
  document.getElementById('login-overlay').classList.remove('hidden');
}

// ── Progress rendering ────────────────────────────────────────
function renderProgress() {
  const pct = Math.min(100, Math.max(0, Math.round(state.done / state.total * 100)));

  document.getElementById('disp-done').textContent  = state.done;
  document.getElementById('disp-total').textContent = state.total;
  document.getElementById('pct-label').textContent  = pct + '%';
  document.getElementById('donut-pct').textContent  = pct + '%';

  // CSS variable drives both bar and donut via CSS calc()
  document.documentElement.style.setProperty('--progress-done', pct);

  // Donut (manual because CSS var in SVG stroke-dashoffset is limited on some browsers)
  const circumference = 2 * Math.PI * 40; // 251.2
  const offset = circumference * (1 - pct / 100);
  document.getElementById('donut-fill').style.strokeDashoffset = offset;

  // Bar
  document.getElementById('bar-fill').style.width = pct + '%';
}

// ── Admin update ──────────────────────────────────────────────
function applyUpdate() {
  if (state.role !== 'admin') return; // guard (belt + suspenders)

  const done  = parseInt(document.getElementById('inp-done').value,  10);
  const total = parseInt(document.getElementById('inp-total').value, 10);

  if (isNaN(done) || isNaN(total) || total < 1 || done < 0 || done > total) {
    alert('Valores inválidos. Asegúrate de que las horas completadas no superen el total.');
    return;
  }

  state.done  = done;
  state.total = total;
  renderProgress();

  const msg = document.getElementById('update-msg');
  msg.classList.add('show');
  setTimeout(() => msg.classList.remove('show'), 2800);
}

setTimeout(function() {
  document.querySelector('.main').classList.add('visible');
}, 100);

// ── Nav active state (visual only) ───────────────────────────




// Enter key on password field


// Initial render (with current state values, no animation)
renderProgress();