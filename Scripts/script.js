//  <!-- Primeiro script -->
// Simulando tempo de carregamento
window.addEventListener('load', () => {
    time = 4000  // tempo de espera em segundos
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('app').classList.remove('hidden');
    }, time);
});



// < !--adicionando um click à página-- >

// window.addEventListener('click', () => {
//     console.log("Clickou!");
//     alert("Clickou!");
//     let result = confirm("Clickou?");
//     console.log(result);
// });



// < !--adicionando um click ao botão de + -- >

// document.getElementById('addEvent').addEventListener('click', () => {
//     console.log("Clickou!");
//     alert("Clickou!");
//     let result = confirm("Clickou?");
//     console.log(result);
// });



// <!--Adicionando um evento através do botão de + -->

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addEvent');
    const eventsContainer = document.querySelector('.events');
    let eventCount = 2;

    addBtn.addEventListener('click', () => {
        addEventButton(++eventCount, eventsContainer)

        // evento para remover o evento cadastrado
        removeEventButton(`${eventCount}`);

    });

});


function addEventButton(eventCount, eventsContainer) {
    const newCard = document.createElement('div');
    newCard.className = 'event-card';
    newCard.id = `event${eventCount}`
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    newCard.innerHTML = `
        <h2>New Event ${eventCount}</h2>
        <p>📍 Custom Location | 📅 | 🕒 ${timeString}</p>
        <button class="dell" id="${eventCount}">-</button>`;

    eventsContainer.appendChild(newCard);
}


function removeEventButton(id) {
    const dellBtn = document.getElementById(id);
    dellBtn.addEventListener('click', () => {
        console.log(dellBtn)
        dellBtn.parentElement.classList.add('hidden')
    });
}


// function editEventButton