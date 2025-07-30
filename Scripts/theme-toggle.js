document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleTema');
  const htmlEl = document.documentElement;

  // Aplica o tema salvo no localStorage ou padrão 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);

  // Atualiza o texto do botão conforme tema
  function updateButtonText(theme) {
    toggleBtn.textContent = theme === 'dark' ? '🌞 Tema Claro' : '🌗 Tema Escuro';
  }
  updateButtonText(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButtonText(newTheme);
  });
});
