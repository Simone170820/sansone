// Ottieni le persone da localStorage
function getPeople() {
  const people = JSON.parse(localStorage.getItem('people'));
  return people || [];
}

// Salva su localStorage
function savePeople(people) {
  localStorage.setItem('people', JSON.stringify(people));
}

// Formatta l’orario in modo leggibile
function getFormattedTime() {
  const now = new Date();
  return now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Segna l'entrata e salva orario
function markEntry(index) {
  const people = getPeople();
  people[index].entered = true;
  people[index].entryTime = getFormattedTime();
  savePeople(people);
  displayPeople();
}

// Mostra la tabella
function displayPeople() {
  const people = getPeople();
  const list = document.getElementById('peopleList');
  list.innerHTML = '';

  if (people.length === 0) {
    list.innerHTML = '<tr><td colspan="6">Nessuna persona registrata.</td></tr>';
    return;
  }

  people.forEach((person, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${person.name}</td>
      <td>${person.surname}</td>
      <td>${person.age}</td>
      <td>${person.entered ? '✅ Entrato' : '❌ Non entrato'}</td>
      <td>${person.entryTime || '-'}</td>
      <td>
        <button onclick="markEntry(${index})" ${person.entered ? 'disabled' : ''}>
          ${person.entered ? 'Entrato' : 'Segna Entrata'}
        </button>
      </td>
    `;
    list.appendChild(row);
  });
}

// Carica la lista al caricamento della pagina
document.addEventListener('DOMContentLoaded', displayPeople);

// Gestione form per segnare entrata tramite nome e cognome
document.getElementById('entrataForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const cognome = document.getElementById('cognome').value;

  if (nome && cognome) {
    const people = getPeople();
    const index = people.findIndex(p => p.name.toLowerCase() === nome.toLowerCase() && p.surname.toLowerCase() === cognome.toLowerCase());

    if (index !== -1) {
      markEntry(index);
      alert(`${nome} ${cognome} ha segnato l'entrata!`);
    } else {
      alert('Bambino non trovato!');
    }
  } else {
    alert('Inserisci nome e cognome.');
  }
});
