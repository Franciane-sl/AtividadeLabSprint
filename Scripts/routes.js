const homePage = document.getElementById('home');
const routes = {
    '/': '<h1>Página Inicial</h1><p>Bem-vindo à página inicial.</p>',
    // '/': `${homePage.innerHtml}`,
    '/about': '<h1>Sobre</h1><p>Informações sobre nós.</p>',
    '/contact': '<h1>Contato</h1><p>Entre em contato conosco.</p>'
};

const contentDiv = document.getElementById('content');
const links = document.querySelectorAll('a[data-route]');

function renderContent(route) {
    contentDiv.innerHTML = routes[route] || '<p>Rota não encontrada.</p>';
}

function navigateTo(route) {
    window.history.pushState({}, '', route);
    renderContent(route);
}

// Adiciona evento de clique nos links
links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo(link.dataset.route);
    });
});

// Renderiza o conteúdo inicial
renderContent(window.location.pathname);

// Adiciona evento para navegação com o histórico
window.onpopstate = () => {
    renderContent(window.location.pathname);
};