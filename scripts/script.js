const botao = document.getElementById('botao-tema');
const root = document.documentElement;
const THEME_KEY = 'tema'; // 'escuro' | 'claro'

function applyTheme(theme) {
  if (!botao) return;

  const isDark = theme === 'escuro';

  root.classList.toggle('dark-theme', isDark);
  document.body.classList.toggle('escuro', isDark);

  botao.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  botao.setAttribute(
    'title',
    isDark ? 'Ativar tema claro' : 'Ativar tema escuro'
  );

  localStorage.setItem(THEME_KEY, theme);
}

// carregar tema salvo ou tema do sistema
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'escuro' : 'claro');
}

// alternância ao clicar
if (botao) {
  botao.addEventListener('click', (e) => {
    e.preventDefault();
    const isDarkNow = root.classList.contains('dark-theme');
    applyTheme(isDarkNow ? 'claro' : 'escuro');
  });
}

// scroll suave
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('#menu a.link');
  const header = document.querySelector('header');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
});
