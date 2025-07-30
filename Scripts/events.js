document.addEventListener('DOMContentLoaded', () => {
  const home = document.getElementById("home");
  const btnNovoEvento = document.getElementById('btnNovoEvento');
  const btnCancelar = document.getElementById('homeBtn');
  const btnLocation = document.getElementById('locationBtn');
  const btnFiltrar = document.getElementById('filtrar');
  const formulario = document.getElementById('formularioEvento');
  const eventoForm = document.getElementById('eventoForm');
  const tipoIngresso = document.getElementById('tipoIngresso');
  const detalhesIngresso = document.getElementById('detalhesIngresso');
  const imagensInput = document.getElementById('imagens');
  const previewImagens = document.getElementById('previewImagens');
  const listaEventos = document.getElementById('listaEventos');
  const mensagemFeedback = document.getElementById('mensagemFeedback');
  const modal = document.getElementById("modal");
  const modalForm = document.getElementById('modalForm');

  let assentos = [];

  // Pega os eventos do localStorage ou inicia vazio
  let eventos = JSON.parse(localStorage.getItem('eventos')) || [];

  // Pega favoritos do localStorage (array de índices ou IDs)
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  // Função para mostrar mensagem de feedback por 3 segundos
  function mostrarFeedback(mensagem) {
    mensagemFeedback.textContent = mensagem;
    mensagemFeedback.classList.remove('hidden');
    setTimeout(() => {
      mensagemFeedback.classList.add('hidden');
      mensagemFeedback.textContent = '';
    }, 3000);
  }

  // Função para renderizar eventos na lista
  function renderEventos(container, eventosLista) {
    container.innerHTML = '';

    if (eventosLista.length === 0) {
      container.innerHTML = '<p>Nenhum evento encontrado.</p>';
      return;
    }

    eventosLista.forEach((evento, index) => {
      // Verifica se o evento está favoritado
      const isFavorito = favoritos.includes(index);

      // Cria card do evento
      const card = document.createElement('article');
      card.className = 'evento-card';
      card.id = `evento${index}`;
      card.setAttribute('tabindex', '0'); // para acessibilidade

      // Conteúdo do card
      card.innerHTML = `
        <h3>${evento.titulo}</h3>
        ${evento.imagens && evento.imagens.length > 0 ? `<img src="${evento.imagens[0]}" alt="Imagem do evento ${evento.titulo}" class="img-evento">` : ''}
        <p><strong>Data:</strong> ${new Date(evento.data).toLocaleString()}</p>
        <p><strong>Local:</strong> ${evento.localizacao}</p>
        <p><strong>Tipo:</strong> ${evento.tipoIngresso}</p>
        <button aria-label="${isFavorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}" class="btn-favorito" data-index="${index}" aria-pressed="${isFavorito}">
          ${isFavorito ? '★ Favorito' : '☆ Favoritar'}
        </button>
        <button onclick="detalhesEvento(${index})" aria-label="Ver detalhes do evento ${evento.titulo}">Detalhes</button>
      `;

      container.appendChild(card);
    });

    // Adiciona evento de clique aos botões favoritar
    document.querySelectorAll('.btn-favorito').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = Number(e.currentTarget.dataset.index);
        toggleFavorito(idx);
      });
    });
  }

  // Alterna favorito e atualiza localStorage e UI
  function toggleFavorito(index) {
    const pos = favoritos.indexOf(index);
    if (pos > -1) {
      favoritos.splice(pos, 1);
      mostrarFeedback('Evento removido dos favoritos.');
    } else {
      favoritos.push(index);
      mostrarFeedback('Evento adicionado aos favoritos.');
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderEventos(listaEventos, eventos);
  }

  // Função para limpar o preview de imagens e mostrar novas (assumindo base64 já processado no readImages)
  function carregarImagensLocais() {
    // Se quiser carregar imagens já salvas, implemente aqui
  }

  // Função simulada para ler imagens e mostrar preview
  async function readImages(event) {
    const files = Array.from(event.target.files);
    previewImagens.innerHTML = '';
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Pré-visualização da imagem do evento';
        previewImagens.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  }

  // Função simulada para converter arquivos para base64 array
  async function arrayToBase64(files) {
    const result = [];
    for (const file of files) {
      result.push(await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject('Erro ao ler arquivo');
        reader.readAsDataURL(file);
      }));
    }
    return result;
  }

  // Função filtro (pode ser adaptada conforme já existente)
  function eventosFiltrados({ filtroTitulo = '', categoriaFiltro = 'todos', filtroData = '' }) {
    return eventos.filter(evento => {
      const tituloOk = evento.titulo.toLowerCase().includes(filtroTitulo.toLowerCase());
      const categoriaOk = categoriaFiltro === 'todos' || evento.categoria === categoriaFiltro;
      const dataOk = filtroData === '' || evento.data.startsWith(filtroData);
      return tituloOk && categoriaOk && dataOk;
    });
  }

  // Função detalhesEvento para modal (mantive seu uso)
  window.detalhesEvento = function (index) {
    modal.showModal();
    const evento = eventos[index];
    // Montar conteúdo do modal (simplificado)
    modalForm.innerHTML = `
      <h2>${evento.titulo}</h2>
      ${evento.imagens && evento.imagens.length > 0 ? `<img src="${evento.imagens[0]}" alt="Imagem do evento ${evento.titulo}" class="modal-img">` : ''}
      <p><strong>Descrição:</strong> ${evento.descricao}</p>
      <p><strong>Data:</strong> ${new Date(evento.data).toLocaleString()}</p>
      <p><strong>Localização:</strong> ${evento.localizacao}</p>
      <p><strong>Tipo de ingresso:</strong> ${evento.tipoIngresso}</p>
      <button id="fecharModal" class="fecharModal" aria-label="Fechar modal">×</button>
    `;

    // Botão fechar modal
    document.getElementById('fecharModal').addEventListener('click', () => {
      modal.close();
    });
  };

  // Eventos dos botões
  btnNovoEvento.addEventListener('click', () => {
    home.classList.add("hidden");
    formulario.classList.remove("hidden");
    criarMapaAssentos(assentos);
  });

  btnCancelar.addEventListener('click', () => {
    formulario.classList.add("hidden");
    home.classList.remove("hidden");
  });

  btnLocation.addEventListener('click', () => {
    getLocation();
  });

  tipoIngresso.addEventListener('change', (e) => {
    detalhesIngresso.classList.toggle('hidden', e.target.value === 'gratuito');
  });

  imagensInput.addEventListener('change', readImages);

  eventoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const imagens64 = await arrayToBase64(eventoForm.imagens.files);

    const novoEvento = {
      titulo: eventoForm.titulo.value,
      descricao: eventoForm.descricao.value,
      data: eventoForm.data.value,
      localizacao: eventoForm.localizacao.value,
      tipoIngresso: tipoIngresso.value,
      valor: eventoForm.valorIngresso?.value || 0,
      taxa: eventoForm.taxa?.value || 0,
      imagens: imagens64,
      assento: assentos || null,
      categoria: document.getElementById('categoriaFiltro').value || 'todos'
    };

    eventos.push(novoEvento);
    localStorage.setItem('eventos', JSON.stringify(eventos));

    renderEventos(listaEventos, eventos);
    mostrarFeedback('Evento salvo com sucesso!');

    eventoForm.reset();
    previewImagens.innerHTML = '';
    detalhesIngresso.classList.add('hidden');
    formulario.classList.add("hidden");
    home.classList.remove("hidden");
  });

  btnFiltrar.addEventListener('click', () => {
    const filtroTitulo = document.getElementById('filtroTitulo').value;
    const categoriaFiltro = document.getElementById('categoriaFiltro').value;
    const filtroData = document.getElementById('filtroData').value;

    const filtrados = eventosFiltrados({ filtroTitulo, categoriaFiltro, filtroData });
    renderEventos(listaEventos, filtrados);
  });

  // Renders iniciais
  renderEventos(listaEventos, eventos);

});
