const botao = document.getElementById('botao-tema');
const root = document.documentElement;
const THEME_KEY = 'tema'; // valor: 'escuro' | 'claro'

function applyTheme(theme) {
  if (!botao) return;
  if (theme === 'escuro') {
    root.classList.add('dark-theme');
    document.body.classList.add('escuro'); // compatibilidade com classes antigas
    botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
    botao.setAttribute('title', 'Ativar tema claro');
  } else {
    root.classList.remove('dark-theme');
    document.body.classList.remove('escuro');
    botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
    botao.setAttribute('title', 'Ativar tema escuro');
  }
  localStorage.setItem(THEME_KEY, theme);
}

// carregar preferência (ou preferência do sistema)
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'escuro' : 'claro');
}

// alternar tema ao clicar
if (botao) {
  botao.addEventListener('click', (e) => {
    e.preventDefault();
    const nowEscuro = root.classList.contains('dark-theme') || document.body.classList.contains('escuro');
    applyTheme(nowEscuro ? 'claro' : 'escuro');
  });
}

// Scroll suave para links de navegação
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('#menu ul a.link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});