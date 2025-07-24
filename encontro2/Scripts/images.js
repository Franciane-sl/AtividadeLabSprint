// Visuliação das imagens de upload de formulário

function readImages(e) {
    Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            previewImagens.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}




async function carregarImagensLocais() {
    const lista = ["images/evento1.jpg", "images/evento2.jpg", "images/evento3.jpg"];
    const carrossel = document.getElementById('carrossel');

    localStorage.setItem('imagensInicio', JSON.stringify(lista));

    carrossel.classList.add('carousel-wrapper');
    carrossel.innerHTML = `<button class="carousel-btn left" onclick="scrollCarouselGrande(this, -1)">◀️</button><div class="carouselGrande">${JSON.parse(localStorage.getItem("imagensInicio")).map(img => `<img src="${img}" alt="${img.split('/')[1]}"/>`).join('')}</div><button class="carousel-btn right" onclick="scrollCarouselGrande(this, 1)">▶️</button>`;
}


// Salvar imagens em Base64 no localStorage

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function arrayToBase64(files) {
    // console.log(Array.from(event.target.files));
    let A = [];

    Array.from(files).map(async (obj) => {
        const a = await toBase64(obj);
        A.push(a);
        // console.log(a);
        return a
    });

    // console.log(A);
    return A
}

async function salvarImagem64LocalStorage(file, name) {
    const base64Image = await toBase64(file);
    localStorage.setItem("" + name, base64Image);
}

function exibirImagemDoLocalStorage(name) {
    const base64String = localStorage.getItem(name);
    if (base64String) {
        const src = "data:image/jpg;base64," + base64String; // Ajuste o tipo de imagem se necessário
        // console.log('Imagem exibida');
        return src;
    } else {
        console.log('Imagem não encontrada no localStorage');
    }
}