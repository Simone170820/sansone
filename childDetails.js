// Recupera i dettagli del bambino dal sessionStorage
const loggedInPerson = JSON.parse(sessionStorage.getItem('loggedInPerson'));

// Se l'utente non è loggato, redirigi al login
if (!loggedInPerson) {
  window.location.href = 'login.html';
}

// Mostra i dettagli del bambino
document.getElementById('childName').textContent = loggedInPerson.name;
document.getElementById('childSurname').textContent = loggedInPerson.surname;
document.getElementById('childBalance').textContent = loggedInPerson.balance || 0;  // saldo bracciale
document.getElementById('childEntered').textContent = loggedInPerson.entered ? 'Sì' : 'No';
document.getElementById('childLunch').textContent = loggedInPerson.lunch ? 'Sì' : 'No';
document.getElementById('childTrip').textContent = loggedInPerson.trip ? 'Sì' : 'No';
