// Nav: de transparente a sólido al hacer scroll, sin ocultarse
const encabezado = document.getElementById('encabezado');
const UMBRAL_SCROLL = 80;

function actualizarNav() {
  if (window.scrollY > UMBRAL_SCROLL) {
    encabezado.classList.add('nav-solido');
  } else {
    encabezado.classList.remove('nav-solido');
  }
}

// init + scroll
window.addEventListener('load', actualizarNav);
window.addEventListener('scroll', actualizarNav);

// =============================
// Enlaces activos del nav
// =============================
const enlacesNav = document.querySelectorAll('.navegacion a');

enlacesNav.forEach(enlace => {
  enlace.addEventListener('click', e => {
    e.preventDefault();

    // Elimina activo de todos
    enlacesNav.forEach(link => link.classList.remove('activo'));

    // Agrega activo al actual
    enlace.classList.add('activo');

    // Desplaza hacia la sección
    const destino = document.querySelector(enlace.getAttribute('href'));
    if (destino) {
      window.scrollTo({
        top: destino.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Quita el activo al hacer clic fuera del nav
document.addEventListener('click', e => {
  if (!e.target.closest('nav')) {
    enlacesNav.forEach(link => link.classList.remove('activo'));
  }
});

// Scroll suave solo para anclas internas (#)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const destino = document.querySelector(link.getAttribute('href'));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// === Tarjetas clickeables con accesibilidad ===
(function () {
  const tarjetas = document.querySelectorAll('.tarjeta[data-link]');
  if (!tarjetas.length) return;

  tarjetas.forEach(card => {
    const url = card.getAttribute('data-link');
    if (!url) return;

    // Estilos de interacción
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', card.querySelector('h3')?.textContent?.trim() || 'Abrir proyecto');

    const open = () => {
      const blank = card.getAttribute('data-blank') === 'true';
      if (blank) {
        window.open(url, '_blank', 'noopener');
      } else {
        window.location.href = url;
      }
    };

    card.addEventListener('click', (e) => {
      // Evita que un <a> interno (si lo agregas en el futuro) duplique navegación
      if (e.target.closest('a')) return;
      open();
    });

    card.addEventListener('keydown', (e) => {
      // Enter o Space → activar
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });
})();

// === Redirección de botones ===
document.getElementById('btn-reproducir').addEventListener('click', () => {
  window.open('https://austintropa.github.io/Proyecto-Orion/', '_blank'); // abre en nueva pestaña
});

document.getElementById('btn-info').addEventListener('click', () => {
  window.open('https://github.com/austintropa/Proyecto-Orion.git', '_blank');
});
