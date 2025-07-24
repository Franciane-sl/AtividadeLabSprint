// script.js



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

    const modal = document.getElementById("modal");
    const modalForm = document.getElementById('modalForm');

    let assentos = [];


    let filtroTitulo;

    let eventosLocalStorage = JSON.parse(localStorage.getItem('eventos')) || [];
    let eventos = eventosFiltrados(eventosLocalStorage);



    carregarImagensLocais();
    // carregarImagensDisponiveis();


    btnNovoEvento.addEventListener('click', () => {
        home.classList.add("hidden");
        formulario.style.display = "flex";
        criarMapaAssentos(assentos);
        console.log(assentos);
    });

    btnCancelar.addEventListener('click', () => {
        formulario.style.display = "none";
        home.classList.remove('hidden');
    });

    btnLocation.addEventListener('click', () => {
        getLocation();
    });

    tipoIngresso.addEventListener('change', (e) => {
        detalhesIngresso.classList.toggle('hidden', e.target.value === 'gratuito');
    });

    imagensInput.addEventListener('change', async (e) => {
        // const imagens64 = await arrayToBase64(e.target.files);
        // console.log(imagens64);

        // Salvar no localStorage

        previewImagens.innerHTML = '';
        readImages(e);
    });

    eventoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const imagens64 = await arrayToBase64(eventoForm.imagens.files);
        console.log(imagens64);

        setTimeout(() => {
            console.log('Esperando ...');
            const novoEvento = {
                titulo: eventoForm.titulo.value,
                descricao: eventoForm.descricao.value,
                data: eventoForm.data.value,
                localizacao: eventoForm.localizacao.value,
                tipoIngresso: tipoIngresso.value,
                valor: eventoForm.valorIngresso?.value || 0,
                taxa: eventoForm.taxa?.value || 0,
                // imagens: [], // Stub, sem upload real    
                // imagens: [...Array.from(eventoForm.imagens.files).map(opt => opt.name)],
                imagens: imagens64,
                assento: assentos || null
            };

            eventos.push(novoEvento);
            localStorage.setItem('eventos', JSON.stringify(eventos));
            renderEventos(listaEventos, eventos);
            eventoForm.reset();
            previewImagens.innerHTML = '';
            formulario.style.display = "none";
            // formulario.classList.add('hidden');
            home.classList.remove('hidden');

            console.log('Finalizando armazenamento ...');


        }, [1000]);


        // console.log(assentos);
    });

    window.marcarPresenca = function (index) {
        console.log(`Presença marcada no evento: ${eventos[index].titulo}`);
    }

    window.detalhesEvento = function (index) {
        console.log(`Evento - detalhes: ${eventos[index].titulo}`);
        // confirm(`Evento - detalhes: ${eventos[index].titulo}`);

        modal.showModal();


        const card = renderModal(eventos[index], index);
        modalForm.innerHTML = card.innerHTML;

    }

    window.removerEvento = function (index) {
        console.log(`Removendo evento: ${eventos[index].titulo}`);
        const remover = document.getElementById(`evento${index}`);
        remover.classList.add('hidden');
    }

    window.addEventListener('keypress', (e) => {
        if (e.key == 'N') {
            home.classList.add("hidden");
            formulario.style.display = 'flex';
            seatMap = criarMapaAssentos();
        } else if (e.key == 'H') {
            home.classList.remove("hidden");
            formulario.style.display = 'none';
        } else return;
    });



    // Eventos de Carrossel

    window.scrollCarouselGrande = function (btn, direction) {
        const wrapper = btn.closest('.carousel-wrapper');
        const carousel = wrapper.querySelector('.carouselGrande');
        const scrollAmount = 300;
        carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    };

    window.scrollCarousel = function (btn, direction) {
        const wrapper = btn.closest('.carousel-wrapper');
        const carousel = wrapper.querySelector('.carousel');
        const scrollAmount = 100;
        carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    };



    // btnFecharModal.addEventListener('click', () => {
    //     // modal.classList.add('hidden');
    //     home.classList.remove('hidden');
    // });


    btnFiltrar.addEventListener('click', () => {

        console.log(document.getElementById('filtroTitulo').value);
    });


    renderEventos(listaEventos, eventos);
});

