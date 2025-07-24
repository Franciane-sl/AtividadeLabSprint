

function renderEventoUnico(evento, index) {
    const imagens = evento.imagens ? evento.imagens : JSON.parse(localStorage.getItem('imagensInicio'));
    const card = document.createElement('div');
    card.className = 'evento-card';
    card.id = `evento${index}`;
    card.innerHTML = `
        <h3>${evento.titulo}</h3>
        <div class="carousel-wrapper"><button class="carousel-btn left" onclick="scrollCarousel(this, -1)">◀️</button><div class="carousel">${imagens.map(img => `<img src="${img}" alt="imagem${index}"/>`).join('')}</div><button class="carousel-btn right" onclick="scrollCarousel(this, 1)">▶️</button></div>
        <p><strong>Quando:</strong> ${new Date(evento.data).toLocaleString()}</p>
        <p><strong>Onde:</strong> ${evento.localizacao}</p>
        <p>${evento.descricao}</p>
        <p><strong>Ingresso:</strong> ${evento.tipoIngresso === 'gratuito' ? 'Gratuito' : `R$ ${evento.valor} + R$ ${evento.taxa}`}</p>
        <button onclick="marcarPresenca(${index})">Eu vou!</button>
        <button onclick="detalhesEvento(${index})">Detalhes</button>
        `;
    return card;
}

// Card com carrossel

function renderEventos(listaEventos, eventos) {
    listaEventos.innerHTML = '';
    eventos?.forEach((evento, index) => {

        const card = renderEventoUnico(evento, index);

        listaEventos.appendChild(card);
    });
}



function renderModal(evento, index) {
    const imagens = evento.imagens ? evento.imagens : JSON.parse(localStorage.getItem('imagensInicio'));
    const card = document.createElement('div');
    card.className = 'evento-card';
    card.id = `evento${index}`;
    card.innerHTML = `
        <h3>${evento.titulo}</h3>
        <div class="carousel-wrapper"><button class="carousel-btn left" onclick="scrollCarousel(this, -1)">◀️</button><div class="carousel">${imagens.map(img => `<img src="${img}" alt="imagem${index}"/>`).join('')}</div><button class="carousel-btn right" onclick="scrollCarousel(this, 1)">▶️</button></div>
        <p><strong>Quando:</strong> ${new Date(evento.data).toLocaleString()}</p>
        <p><strong>Onde:</strong> ${evento.localizacao}</p>
        <div id="mapa"><iframe id="mapaFrame" src="https://www.google.com/maps/embed" width="100%" height="450px" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div>
        <p>${evento.descricao}</p>
        <p><strong>Ingresso:</strong> ${evento.tipoIngresso === 'gratuito' ? 'Gratuito' : `R$ ${evento.valor} + R$ ${evento.taxa}`}</p>
        <button id="fecharModal" style="background-color: green; height: 40px;">Fechar</button>
        <button style="background-color: red; width: 200px; margin-left: auto;" onclick="removerEvento(${index})">Remover</button>
        `;
    return card;
}



// Função para gerar o mapa de assentos

function criarMapaAssentos(assentos) {
    const mapa = document.getElementById('mapaAssentos');
    mapa.innerHTML = '';
    mapa.classList.remove('hidden');
    for (let i = 0; i < 50; i++) {
        const div = document.createElement('div');
        div.className = 'assento';
        div.title = `Assento ${i + 1}`;
        div.addEventListener('click', () => {
            if (div.classList.contains('ocupado')) return;
            div.classList.toggle('selecionado');
            console.log(`Assento ${i + 1}`);
            assentos.push(i + 1);
        });
        mapa.appendChild(div);
    }
    return mapa;
}



// funções para Gelocalização

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        return;
    }
}

function success(position) {
    const mensagem = "Latitude: " + position.coords.latitude +
        " e Longitude: " + position.coords.longitude;

    const localizacao = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }

    console.log(mensagem);
    // console.log(localizacao);
    const url = urlLocation(localizacao);
    // console.log(url);

    const mapa = document.getElementById('mapaFrame');

    mapa.src = url;

}

function error() {
    alert("Desculpe, não consegui recuperar a sua geolocalização.");
}

function urlLocation(localizacao) {

    // console.log(localizacao);

    const lat = localizacao.latitude;
    const lon = localizacao.longitude;

    // console.log(lat, lon);


    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.003975601591!2d${lon}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997fb7e7f5c143%3A0x7d6238e81d87b7b7!2sP%C3%A1tio%20Carioca!5e0!3m2!1spt-BR!2sbr!4v1626891808824!5m2!1spt-BR!2sbr`;
};




function eventosFiltrados(eventosLocalStorage) {
    const variavel = JSON.parse(localStorage.getItem('eventos')) || []
    console.log(variavel);

    return eventosLocalStorage;
}